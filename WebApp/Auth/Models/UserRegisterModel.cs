namespace WebApp.Auth.Models
{
    public struct BirthDate
    {
        public int Year { get; set; }
        public int Month { get; set; }
        public int Day { get; set; }
    }
    public class UserRegisterModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public BirthDate BirthDate { get; set; }
        public string PhoneNumber { get; set; }
    }
}
