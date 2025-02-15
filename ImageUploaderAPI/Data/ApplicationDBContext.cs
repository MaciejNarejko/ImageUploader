using Microsoft.EntityFrameworkCore;
using static System.Net.Mime.MediaTypeNames;

namespace ImageUploaderAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
    }
}
