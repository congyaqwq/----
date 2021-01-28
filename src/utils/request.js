import axios from 'axios'


export default function (options = {}) {
  const { method = 'get', url, data, params } = options
  return axios({
    baseURL: 'http://localhost:3000/',
    method,
    url,
    data,
    params,
    headers: {}
  })
}