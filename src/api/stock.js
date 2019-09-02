// stock页面的接口
import fetch from '@/utils/fetch'

// 获取个股信息
export function getStock (code) {
  return fetch({
    url: '/api/stock',
    method: 'get',
    params: { code }
  })
}

export function getStockBaseInfo (code) {
  return fetch({
    url: 'api/stock/baseInfo',
    method: 'get',
    params: { code }
  })
}

export function getKLineData (code, type) {
  return fetch({
    url: '/api/stock/getKLineData',
    method: 'get',
    params: { code, type }
  })
}

export function getReport (code, day) {
  return fetch({
    url: '/api/stock/getReport',
    method: 'get',
    params: { code, day }
  })
}

export function getReportContent (id) {
  return fetch({
    url: '/api/stock/getReportContent',
    method: 'get',
    params: {id}
  })
}

export function getSteelData () {
  return fetch({
    url: '/api/stock/getSteelData',
    method: 'get'
  })
}

export function getEventData (code, date, page, limit) {
  return fetch({
    url: '/api/stock/QuotationAnalysis',
    method: 'get',
    params: { code, date, page, limit }
  })
}

export function getNotice (code, day) {
  return fetch({
    url: '/api/stock/getNotice',
    method: 'get',
    params: { code, day }
  })
}

export function getNoticeContent (id) {
  return fetch({
    url: '/api/stock/getNoticeContent',
    method: 'get',
    params: {id}
  })
}

export function getNews (code, day) {
  return fetch({
    url: '/api/stock/getNews',
    method: 'get',
    params: { code, day }
  })
}

export function getNewsContent (id) {
  return fetch({
    url: '/api/stock/getNewsContent',
    method: 'get',
    params: {id}
  })
}
export function getStatistics (code, day, type) {
  return fetch({
    url: '/api/stock/statistics',
    method: 'get',
    params: {code, day, type}
  })
}
