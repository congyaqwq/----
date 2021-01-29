import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'blogs/list',
    params
  })
}

export function detail(id) {
  return request({
    url: `blogs/detail/${id}`
  })
}

export function add(data) {
  return request({
    url: `blogs/add`,
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: `blogs/update/${data.id}`,
    method: 'put',
    data
  })
}

export function remove(id) {
  return request({
    url: `blogs/remove/${id}`,
    method: 'delete',
  })
}