// 搜索的接口
import fetch from '@/utils/fetch'

export function querySearch (queryText) {
  return fetch({
    url: '/api/search',
    method: 'post',
    data: {
      queryText
    }
  })
}
