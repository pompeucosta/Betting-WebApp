using System.Diagnostics.Metrics;
using System.Diagnostics;

namespace WebApp.Data
{
    public class OpenTelemetryData
    {
        private static Meter _meter = new Meter(MeterName);
        public static string ServiceName => "NetClit";
        public static string ServiceVersion => "1.0";
        public static string MeterName => "LoginMetrics";

        public static readonly Counter<long> SuccessfulLoginsCounter = _meter.CreateCounter<long>("successful_logins");
        public static readonly Counter<long> FailedLoginsCounter = _meter.CreateCounter<long>("failed_logins");
        public static readonly Counter<long> RegistrationsCounter = _meter.CreateCounter<long>("failed_logins");
        public static readonly ActivitySource MyActivitySource = new(ServiceName, ServiceVersion);
    }
}
