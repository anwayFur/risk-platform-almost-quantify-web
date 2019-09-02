// 实时行情的接口
import fetch from '@/utils/fetch'

export function getRealTimeQuotes (code, type) {
  return fetch({
    url: 'api/getRealTimeQuotes',
    method: 'get',
    params: { code, type }
  })
}
