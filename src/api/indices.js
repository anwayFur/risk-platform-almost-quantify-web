// 指数的接口
import fetch from '@/utils/fetch'

export function getIndices (code) {
  return fetch({
    url: '/api/indices',
    method: 'get',
    params: { code }
  })
}
