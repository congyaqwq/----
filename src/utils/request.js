import axios from 'axios'

import { get } from '@/utils/localData'
import { message } from 'ant-design-vue'

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default function (options = {}) {
  const { method = 'get', url, data, params } = options
  const baseURL = process.env.NODE_ENV == 'production' ? 'https://www.congyaqwq.top/api/' : 'http://localhost:3000/api/'
  // const baseURL = process.env.NODE_ENV == 'production' ? 'http://39.103.137.10:3000/' : 'http://localhost:80/api/'
  const token = get('lc_blog_manage')
  return axios({
    baseURL,
    method,
    url,
    data,
    params,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).catch(e => {
    message.error(e.response && e.response.data.message || '未知错误')
    throw (e)
  })
}