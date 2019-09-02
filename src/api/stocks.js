// 菜单 股票的接口
import fetch from '@/utils/fetch'

// ******************** 股票热点 ******************** //
// 评级为买入的研报数量排行
export function getRankWithBuyReportNum () {
  return fetch({
    url: '/api/stocks/hot/rankWithBuyReportNum',
    method: 'get',
    params: { }
  })
}

// 根据天数获取机构收益率排名
export function getOrgRankWithIncome (days) {
  return fetch({
    url: '/api/stocks/hot/orgRankWithIncome',
    method: 'get',
    params: { days }
  })
}

// 根据天数获取机构收益率排名
export function getStockScoreRank () {
  return fetch({
    url: '/api/stocks/hot/score',
    method: 'get',
    params: { }
  })
}

// ******************** 机会提示和风险预警 ******************** //

// 获取风险数据
export function getRiskData () {
  return fetch({
    url: '/api/stocks/prompt/risk',
    method: 'get',
    params: { }
  })
}

// 获取机会数据
export function getOddsData () {
  return fetch({
    url: '/api/stocks/prompt/odds',
    method: 'get',
    params: { }
  })
}

// 获取风险、机会数据相关事件
export function getNpEventData (code) {
  return fetch({
    url: '/api/stocks/prompt/content',
    method: 'get',
    params: { code }
  })
}

// ******************** 重点研报 ******************** //
// 获取重点研报
export function getReportFocusData () {
  return fetch({
    url: '/api/stocks/reportFocusList',
    method: 'get'
  })
}

// ******************** 财报优选 ******************* //
// 获取财报优选数据
export function getPreferredData (listQuery) {
  return fetch({
    url: '/api/stocks/financeReport/getPreferredData',
    method: 'get',
    params: listQuery
  })
}

// 获取行业指标平均数据
export function getAvgDataByHy (range) {
  return fetch({
    url: '/api/stocks/financeReport/getAvgDataByHy',
    method: 'get',
    params: { range }
  })
}
