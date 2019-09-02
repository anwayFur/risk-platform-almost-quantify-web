// 基金的接口
import fetch from '@/utils/fetch'
 /* 获取基金净值估算，基金代码的实时数据 */
export function getRealTimeQuotes (type, code) {
  return fetch({
    url: '/api/getRealTimeQuotes',
    method: 'get',
    params: { type, code }
  })
}
 /* 获取基金单位净值，累计净值，基金名称 */
export function getFundData (code) {
  return fetch({
    url: '/api/fund',
    method: 'get',
    params: { code }
  })
}
 /* 获取基金基本信息：管理人、基金经理，基金规模等 */
export function getFundBaseInfo (code) {
  return fetch({
    url: '/api/fund/baseInfo',
    method: 'get',
    params: { code }
  })
}
/* 获取投向分析数据 */
export function getDataAnalysis (code) {
  return fetch({
    url: '/api/fund/investment',
    method: 'get',
    params: { code }
  })
}
/* 获取风险信息数据 */
export function getRiskData (code) {
  return fetch({
    url: '/api/fund/risk',
    method: 'get',
    params: { code }
  })
}
/* 获取分红数据 */
export function getDividendData (code) {
  return fetch({
    url: '/api/fund/dividends',
    method: 'get',
    params: { code }
  })
}
/* 获取基金收益率 */
export function getReturnRate (code, type) {
  return fetch({
    url: '/api/fund/returnRate',
    method: 'get',
    params: { code, type }
  })
}
/* 获取定投数据 */
export function getInvestData (minIncomeRateForYear, maxMaxRetrace, isPreferred, selectedCode,
                               orderBy, isReverse, page, limit) {
  return fetch({
    url: '/api/funds/invest',
    method: 'get',
    params: {
      minIncomeRateForYear, maxMaxRetrace, isPreferred, selectedCode, orderBy, isReverse, page, limit}
  })
}

/* 获取养老数据 */
export function getPensionData (minIncomeRateForYear, fundType, isPreferred, selectedCode,
                               orderBy, isReverse, page, limit) {
  return fetch({
    url: '/api/funds/pension',
    method: 'get',
    params: {
      minIncomeRateForYear, fundType, isPreferred, selectedCode, orderBy, isReverse, page, limit}
  })
}
