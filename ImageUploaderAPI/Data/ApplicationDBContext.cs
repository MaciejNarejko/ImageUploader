using Microsoft.EntityFrameworkCore;
using ImageUploaderAPI.Models;

namespace ImageUploaderAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Image> Images { get; set; } = null!;
    }
}
