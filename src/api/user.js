import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/users/login',
    method: 'post',
    data
  })
}

export function detail() {
  return request({
    url: 'users/detail',
  })
}