using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using WebApp.Auth.Models;
using WebApp.BettingTrans.Models;

namespace WebApp.Data
{
    public class DataContext : IdentityDbContext<ApplicationUser>
    {
        public DataContext(DbContextOptions<DataContext> options): base(options) 
        {

        }
        public DbSet<User> UsersList { get; set; } = null!;
        public DbSet<Wallet> WalletsList { get; set; } = null!;
        public DbSet<Bet> BetsList { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
        
    }
}
