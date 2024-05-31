using System.ComponentModel.DataAnnotations;

namespace WebApp.Auth.Models
{
    public class Wallet
    {
        [Key]
        public int WalletId { get; set; }

        public string Currency { get; set; } = string.Empty;
        public float Balance { get; set; } = 0f;
        public List<string> transactions;

        public void Deposit(float amount)
        {
            Balance += amount;
            transactions.Add($"Deposit: +{amount} {Currency}");
        }

        public void Withdraw(float amount)
        {
            if (Balance >= amount)
            {
                Balance -= amount;
                transactions.Add($"Withdrawal: -{amount} {Currency}");
            }
            else
            {
                Console.WriteLine("No funds");
            }
        }

        public List<string> TransactionHistory()
        {
            return transactions;
        }
    }
}
