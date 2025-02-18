using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ImageUploaderAPI.Data;
using ImageUploaderAPI.Models;
using ImageSharpImage = SixLabors.ImageSharp.Image; 

namespace ImageUploaderAPI.Controllers
{
    [ApiController]
    [Route("api/images")]
    public class ImagesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IWebHostEnvironment _env;

        public ImagesController(ApplicationDbContext context, IWebHostEnvironment env)
        {
            _context = context;
            _env = env;
        }

        // POST: api/upload
        [HttpPost("upload")]
        public async Task<IActionResult> Upload([FromForm] IFormFile[] files)
        {
            if (files == null || files.Length == 0)
                return BadRequest("Brak przesłanych plików.");

            var currentCount = await _context.Images.CountAsync();
            if (currentCount + files.Length > 10)
                return BadRequest("Limit zdjęć na serwerze wynosi 10. Usuń niektóre zdjęcia, aby wgrać nowe.");

            var maxFileSize = 3145728; 
            var uploadsPath = Path.Combine(_env.WebRootPath, "uploads");

            if (!Directory.Exists(uploadsPath))
            {
                Directory.CreateDirectory(uploadsPath);
            }

            var batchFileNames = new HashSet<string>(StringComparer.OrdinalIgnoreCase);

            foreach (var file in files)
            {
                var fileName = Path.GetFileName(file.FileName);

                if (!batchFileNames.Add(fileName))
                {
                    return BadRequest($"W przesłanych plikach występuje więcej niż jeden plik o nazwie {fileName}.");
                }

                var diskFilePath = Path.Combine(uploadsPath, fileName);
                if (System.IO.File.Exists(diskFilePath))
                {
                    return BadRequest($"Plik o nazwie {fileName} już istnieje. Usuń istniejący plik lub zmień nazwę przesyłanego pliku.");
                }
            }

            var uploadedImages = new List<Image>();

            foreach (var file in files)
            {
                if (file.Length > maxFileSize)
                    return BadRequest($"Plik {file.FileName} przekracza limit 3 MB.");

                var fileName = Path.GetFileName(file.FileName);
                var diskFilePath = Path.Combine(uploadsPath, fileName);

                long fileSize;
                int width, height;
                string contentType = file.ContentType;

                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    fileSize = memoryStream.Length;

                    memoryStream.Position = 0;
                    using (var img = await SixLabors.ImageSharp.Image.LoadAsync(memoryStream))
                    {
                        width = img.Width;
                        height = img.Height;
                    }

                    memoryStream.Position = 0;
                    using (var fileStream = new FileStream(diskFilePath, FileMode.Create))
                    {
                        await memoryStream.CopyToAsync(fileStream);
                    }
                }

                var imageRecord = new Image
                {
                    FileName = fileName,
                    FilePath = $"/uploads/{fileName}",
                    UploadDate = DateTime.Now,
                    Width = width,
                    Height = height,
                    FileSize = fileSize,
                    ContentType = contentType
                };

                _context.Images.Add(imageRecord);
                uploadedImages.Add(imageRecord);
            }

            await _context.SaveChangesAsync();
            return Ok(uploadedImages);
        }

        // GET: api/images
        [HttpGet]
        public async Task<IActionResult> GetImages()
        {
            var images = await _context.Images.ToListAsync();
            return Ok(images);
        }

        // GET: /uploads/{fileName}
        [HttpGet("~/uploads/{fileName}")]
        public IActionResult Download(string fileName)
        {
            if (string.IsNullOrWhiteSpace(fileName))
                return BadRequest("Nieprawidłowa nazwa pliku.");

            if (fileName.Contains("..") || fileName.Contains(Path.DirectorySeparatorChar) || fileName.Contains(Path.AltDirectorySeparatorChar))
                return BadRequest("Nieprawidłowa nazwa pliku.");

            var uploadsPath = Path.Combine(_env.WebRootPath, "uploads");
            var filePath = Path.Combine(uploadsPath, fileName);

            if (!System.IO.File.Exists(filePath))
                return NotFound("Plik nie istnieje.");

            var contentType = "application/octet-stream";
            return PhysicalFile(filePath, contentType, fileName);
        }

        // DELETE: api/images/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var image = await _context.Images.FindAsync(id);
            if (image == null)
                return NotFound("Obrazek o podanym id nie istnieje.");

            var uploadsPath = Path.Combine(_env.WebRootPath, "uploads");
            var fileName = Path.GetFileName(image.FilePath);
            var diskFilePath = Path.Combine(uploadsPath, fileName);

            try
            {
                if (System.IO.File.Exists(diskFilePath))
                {
                    System.IO.File.Delete(diskFilePath);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Błąd podczas usuwania pliku: {ex.Message}");
            }

            _context.Images.Remove(image);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
