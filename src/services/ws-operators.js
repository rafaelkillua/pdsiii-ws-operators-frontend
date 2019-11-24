import axios from './axios'

export default {
  pay: (operator, data) => axios.post(`pay/${operator}`, data)
}
