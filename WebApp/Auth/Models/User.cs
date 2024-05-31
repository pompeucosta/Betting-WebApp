using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApp.Auth.Models
{
    public class User
    {
        //public int UserId { get; set; }
        public DateOnly BirthDate { get; set; }
        public string PhoneNumber { get; set; }
        [Key]
        [ForeignKey("UserID")]
        public ApplicationUser ApplicationUser { get; set; }
        public Wallet Wallet { get; set; } = new Wallet();

    }

}