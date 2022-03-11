import axios from 'axios'
import { RawMeasurement, toMeasurement } from './measurement'

export async function uploadMeasurement (url: string, rawMeasurement: RawMeasurement) {
  const measurement = toMeasurement(rawMeasurement)

  await axios.post(
    `${url}/api/measurements`,
    measurement
  )

  console.log(
    `Uploaded measurement from ${measurement.time} for inverter ${measurement.inverter.name}`
  )
}
