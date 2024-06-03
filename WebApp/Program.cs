using WebApp.Data;
using WebApp.Auth.Models;
using Microsoft.EntityFrameworkCore;
using OpenTelemetry.Resources;
using OpenTelemetry.Logs;
using OpenTelemetry.Metrics;
using OpenTelemetry.Trace;

var logsLocation = Environment.GetEnvironmentVariable(EnvVariables.LogsEnvVariableName);
if(logsLocation != null)
    EnvVariables.LogsExportEndpoint = logsLocation;

var tracesLocation = Environment.GetEnvironmentVariable(EnvVariables.TracesEnvVariableName);
if (tracesLocation != null)
    EnvVariables.TracesExportEndpoint = tracesLocation;

var brokerAddr = Environment.GetEnvironmentVariable(EnvVariables.BrokerEnvVariableName);
if (brokerAddr != null)
    EnvVariables.BrokerAddress = brokerAddr;

var builder = WebApplication.CreateBuilder(args);

var dbAddr = Environment.GetEnvironmentVariable(EnvVariables.DbEnvVariableName);
if (dbAddr != null)
    EnvVariables.DbAddress = dbAddr;
else
    EnvVariables.DbAddress = builder.Configuration.GetConnectionString("DbConnection");

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(EnvVariables.DbAddress)
);

builder.Services.AddAuthorization();
builder.Services.AddIdentityApiEndpoints<ApplicationUser>(options =>
{
    options.Password.RequireNonAlphanumeric = false;
    options.Password.RequiredUniqueChars = 0;
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 5;
    options.Password.RequireDigit = false;
}
).AddEntityFrameworkStores<DataContext>();

builder.Logging.AddOpenTelemetry(x =>
{
    x.SetResourceBuilder(ResourceBuilder.CreateDefault().AddService(OpenTelemetryData.ServiceName))
    .AddOtlpExporter(options =>
    {
        options.Endpoint = new Uri(EnvVariables.LogsExportEndpoint);
    });
});

builder.Services.AddOpenTelemetry()
    .WithMetrics(x =>
    {
        x.AddRuntimeInstrumentation()
        .AddPrometheusExporter()
        .AddMeter(OpenTelemetryData.AuthMeterName)
        .AddMeter(OpenTelemetryData.WalletMeterName);
    })
    .WithTracing(x =>
    {
        x.AddSource(OpenTelemetryData.ServiceName)
        .ConfigureResource(resource => resource.AddService(OpenTelemetryData.ServiceName, serviceVersion: OpenTelemetryData.ServiceVersion))
        .AddAspNetCoreInstrumentation()
        .AddHttpClientInstrumentation()
        .AddOtlpExporter( options =>
        {
            options.Endpoint = new Uri(EnvVariables.TracesExportEndpoint);
        });
    });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<DataContext>();
    context.Database.EnsureCreated();
}

app.UseOpenTelemetryPrometheusScrapingEndpoint();
app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();
app.MapFallbackToFile("/index.html");
app.Run();
