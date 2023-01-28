using Blog.Data.Entities;
using Microsoft.EntityFrameworkCore;

namespace Blog.Data.Context
{
    public class DBContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(@"Server=localhost;Port=5432;Database=BlogDatabase;User Id=postgres;Password=123;");
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Users>(entity =>
            {
                entity.ToTable("USERS");
            });
        }
        public DbSet<Users> Users { get; set; }

    }
}
