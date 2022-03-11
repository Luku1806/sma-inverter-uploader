import { readConfig } from "./config";
import { connectToMqttBroker } from "./mqtt";
import { uploadMeasurement } from "./measurementService";

const config = readConfig();
const mqtt = connectToMqttBroker(config);

mqtt.on("message", async (topic, message) => {
  const measurement = JSON.parse(message.toString("utf8"));
  await uploadMeasurement(config.backendUrl, measurement);
});
