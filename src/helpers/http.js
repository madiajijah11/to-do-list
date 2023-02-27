import axios from 'axios'

const http = () => {
  const headers = {}
  const instance = axios.create({
    baseURL: 'https://todo.api.devcode.gethired.id',
    headers
  })
  return instance
}

export default http
