import { AzureFunction, Context } from '@azure/functions'
import axios from 'axios'

axios.defaults.validateStatus = function () {
  return true
}

const timerTrigger: AzureFunction = async function (
  context: Context,
  timer: any,
): Promise<void> {
  const response = await axios.get(
    'https://solar-backend.reiningapps.de',
  )

  context.log(
    `Response from solar-backen with status: ${response.status}`,
  )
}

export default timerTrigger
