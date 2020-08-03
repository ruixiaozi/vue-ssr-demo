import axios from 'axios'

export function createAxios() {
  return axios.create({
    baseURL: 'http://example.com',
    method: 'get'
  })
}