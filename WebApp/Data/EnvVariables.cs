namespace WebApp.Data
{
    public static class EnvVariables
    {
        public static string LogsEnvVariableName { get; } = "LOGS_EXPORT_ENDPOINT";
        public static string LogsExportEndpoint { get; set; } = "http://localhost:3100";
        public static string TracesEnvVariableName { get; } = "TRACES_EXPORT_ENDPOINT";
        public static string TracesExportEndpoint { get; set; } = "http://localhost:4317";
        public static string BrokerEnvVariableName { get; } = "MQTT_ADDRESS";
        public static string BrokerAddress { get; set; } = "http://localhost:1883";
        public static string DbEnvVariableName { get; } = "DATABASE_ADDRESS";
        public static string DbAddress { get; set; } = "";
    }
}
