import 'dotenv/config'
import { Command, Option } from 'commander'

export interface Config {
  readonly mqttHost: string;
  readonly mqttPort: number;
  readonly mqttUser?: string;
  readonly mqttPassword?: string;
  readonly mqttProtocol:
    | 'wss'
    | 'ws'
    | 'mqtt'
    | 'mqtts'
    | 'tcp'
    | 'ssl'
    | 'wx'
    | 'wxs';
  readonly mqttTopic: string;
  readonly backendUrl: string
}

export function readConfig () {
  const program = new Command()

  program.addHelpText(
    'beforeAll',
    'Please specify all needed configuration options for sma-inverter-uploader'
  )

  program.addOption(
    new Option('-mh, --mqttHost <string>', 'specify mqtt host')
      .env('MQTT_HOST')
      .default('localhost')
  )

  program.addOption(
    new Option('-mp, --mqttPort <number>', 'specify mqtt port number')
      .env('MQTT_PORT')
      .default(80)
      .argParser((value) => parseInt(value, 10))
      .makeOptionMandatory(true)
  )

  program.addOption(
    new Option('-mu, --mqttUser <string>', 'specify mqtt user name')
      .env('MQTT_USER')
      .makeOptionMandatory(true)
  )

  program.addOption(
    new Option('-mpw, --mqttPassword <string>', 'specify mqtt password').env(
      'MQTT_PASSWORD'
    )
  )

  program.addOption(
    new Option('-mpw, --mqttProtocol <string>', 'specify mqtt protocol')
      .env('MQTT_PROTOCOL')
      .choices(['wss', 'ws', 'mqtt', 'mqtts', 'tcp', 'ssl', 'wx', 'wxs'])
      .default('mqtt')
  )

  program.addOption(
    new Option('-mt, --mqttTopic <string>', 'specify mqtt topic')
      .env('MQTT_TOPIC')
      .default('#')
  )

  program.addOption(
    new Option('-bu, --backendUrl <string>', 'specify backend url')
      .env('BACKEND_URL')
  )

  program.parse()
  return program.opts<Config>()
}
