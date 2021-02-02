import axios from 'axios'

import { get } from '@/utils/localData'
import { message } from 'ant-design-vue'

const token = get('lc_blog_manage')

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default function (options = {}) {
  const { method = 'get', url, data, params } = options
  return axios({
    baseURL: 'http://localhost:3000/',
    method,
    url,
    data,
    params,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).catch(e => {
    message.error(e.response.data.message)
    throw (e)
  })
}