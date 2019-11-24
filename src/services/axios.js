import axios from 'axios'

const _axios = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

export default _axios
