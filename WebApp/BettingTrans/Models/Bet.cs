using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using WebApp.Auth.Models;

namespace WebApp.BettingTrans.Models
{
    public class Bet
    {
        [Key]
        public int BetID { get; set; }
        public float AmountPlaced { get; set; }
        public int FixtureID { get; set; }

        [ForeignKey("UserID")]
        public string UserID { get; set; }
        public User User { get; set; } 

    }

}