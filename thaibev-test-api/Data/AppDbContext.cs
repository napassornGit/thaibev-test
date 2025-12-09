using Microsoft.EntityFrameworkCore;
using thaibev_test_api.Models;

namespace thaibev_test_api.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<Product> Products { get; set; }
    }
}
