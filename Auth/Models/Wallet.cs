using System.ComponentModel.DataAnnotations;

namespace Auth.Models
{
    public class Wallet
    {
        [Key]
        public string WalletId { get; set; }

        public string Currency { get; set; }
        public float Balance { get; set; }
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
