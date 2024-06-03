using System.Diagnostics.Metrics;
using System.Diagnostics;

namespace WebApp.Data
{
    public class OpenTelemetryData
    {
        private static Meter _authMeter = new Meter(AuthMeterName);
        private static Meter _walletMeter = new Meter(WalletMeterName);
        public static string ServiceName => "NetClit";
        public static string ServiceVersion => "1.0";
        public static string AuthMeterName => "AuthMetrics";
        public static string WalletMeterName => "WalletMetrics";

        public static readonly Counter<long> SuccessfulLoginsCounter = _authMeter.CreateCounter<long>("successful_logins");
        public static readonly Counter<long> FailedLoginsCounter = _authMeter.CreateCounter<long>("failed_logins");
        public static readonly Counter<long> RegistrationsCounter = _authMeter.CreateCounter<long>("registrations");
        public static readonly Counter<long> DepositsCounter = _walletMeter.CreateCounter<long>("deposits");
        public static readonly Counter<long> WithdrawalsCounter = _walletMeter.CreateCounter<long>("withdrawals");
        public static readonly ActivitySource MyActivitySource = new(ServiceName, ServiceVersion);
    }
}
