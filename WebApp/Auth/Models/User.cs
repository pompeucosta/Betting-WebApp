using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApp.BettingTrans.Models;

namespace WebApp.Auth.Models
{
    public class User
    {
        public DateOnly BirthDate { get; set; }
        public string PhoneNumber { get; set; }
        [Key]
        [ForeignKey("UserID")]
        public ApplicationUser ApplicationUser { get; set; }
        [ForeignKey("WalletID")]
        public int WalletID { get; set; }
        public Wallet Wallet { get; set; } = new Wallet();
        public ICollection<Bet> BetList { get; set; } = new List<Bet>();
    }

}