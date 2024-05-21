using Auth.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Auth.Models
{
    public class User
    {
        [Key]
        public string UserId { get; set; } = null!;
        public string ApplicationUserId { get; set; } = null!;
        public string WalletId { get; set; } = null!;

        public virtual ApplicationUser ApplicationUser { get; set; } = null!;
        public virtual Wallet Wallet { get; set; } = null!;

    }

}