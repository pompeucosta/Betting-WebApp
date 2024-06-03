using MQTTnet.Client;
using MQTTnet;

namespace WebApp.Data
{
    public static class MQTT
    {
        public static async Task PublishMessageAsync(ILogger logger,string brokerAddress, string topic, string message)
        {
            var factory = new MqttFactory();
            var mqttClient = factory.CreateMqttClient();

            var options = new MqttClientOptionsBuilder()
                .WithTcpServer(brokerAddress)
                .Build();

            try
            {
                await mqttClient.ConnectAsync(options);
            }catch(Exception ex)
            {
                logger.LogError($"failed to connect to broker at {brokerAddress} - {ex.Message}");
                return;
            }

            var messageBuilder = new MqttApplicationMessageBuilder()
            .WithTopic(topic)
            .WithPayload(message)
            .Build();

            await mqttClient.PublishAsync(messageBuilder);
            await mqttClient.DisconnectAsync();
        }
    }
}
