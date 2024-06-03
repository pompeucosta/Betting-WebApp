namespace WebApp.Data
{
    public static class EnvVariables
    {
        public static string LogsExportEndpoint { get; set; } = Environment.GetEnvironmentVariable("LOGS_EXPORT_ENDPOINT") ?? "http://localhost:3100";
        public static string TracesExportEndpoint { get; set; } = Environment.GetEnvironmentVariable("TRACES_EXPORT_ENDPOINT") ?? "http://localhost:4317";
        public static string BrokerAddress { get; set; } = Environment.GetEnvironmentVariable("MQTT_ADDRESS") ?? "localhost";
        public static string DbAddress { get; set; } = Environment.GetEnvironmentVariable("DATABASE_ADDRESS") ?? "";
    }
}
