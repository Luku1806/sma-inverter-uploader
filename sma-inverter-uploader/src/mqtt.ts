import * as mqtt from "mqtt";
import { Config } from "./config";

export function connectToMqttBroker(config: Config) {
  console.log(
    `Connecting to MQTT broker ${config.mqttHost}:${config.mqttPort}`
  );

  const client = mqtt.connect({
    host: config.mqttHost,
    port: config.mqttPort,
    protocol: config.mqttProtocol,
    username: config.mqttUser,
    password: config.mqttPassword,
    clientId: "sma-uploader",
    clean: false,
  });

  client.on("connect", () => {
    console.log(
      `Connected to MQTT broker ${config.mqttHost}:${config.mqttPort}`
    );

    client.subscribe({ [config.mqttTopic]: { qos: 2 } }, (err) => {
      if (!err) {
        console.log(`Subscribed to topic "${config.mqttTopic}"`);
      }
    });
  });

  return client;
}
