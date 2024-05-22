using WebApp.Auth.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace WebApp.Data
{
    public class DataContext : IdentityDbContext<ApplicationUser>
    {
        public DataContext(DbContextOptions<DataContext> options): base(options) 
        {

        }
        public DbSet<User> UsersList { get; set; } = null!;
        public DbSet<ApplicationUser> ApplicationUsersList { get; set; } = null!;
        public DbSet<Wallet> WalletsList { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
        
    }
}
