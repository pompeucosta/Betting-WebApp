using System.ComponentModel.DataAnnotations;

namespace WebApp.BettingTrans.Models
{
    public class CreateBetModel
    {
        [Required]
        public float AmountPlaced { get; set; }
        [Required]
        public int FixtureID { get; set; }
    }
}
