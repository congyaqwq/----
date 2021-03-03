import request from '@/utils/request'

export function list(params) {
  return request({
    url: 'tags/list',
    params
  })
}

export function detail(id) {
  return request({
    url: `tags/detail/${id}`
  })
}

export function add(data) {
  return request({
    url: `tags/add`,
    method: 'post',
    data
  })
}

export function update(data) {
  return request({
    url: `tags/update/${data.id}`,
    method: 'put',
    data
  })
}

export function remove(id) {
  return request({
    url: `tags/remove/${id}`,
    method: 'delete',
  })
}