import axios from 'axios'
import { notifications } from '@mantine/notifications'

export const fetcher = url => axios.get(url).then(result => result.data)

export const notifyError = error => {
  notifications.show({
    title: 'Error',
    message: error.toString(),
    color: 'red'
  })
}
