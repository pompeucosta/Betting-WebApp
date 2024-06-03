namespace WebApp.Data
{
    public static class EnvVariables
    {
        public static string LogsExportEndpoint { get; set; } = "http://localhost:3100";
        public static string TracesExportEndpoint { get; set; } = "http://localhost:4317";
    }
}
