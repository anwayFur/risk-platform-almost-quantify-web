// 首页内容的接口
import fetch from '@/utils/fetch'

// 获取首页股票排行
export function getMainStockRank () {
  return fetch({
    url: '/api/main/stockRank',
    method: 'get',
    params: { }
  })
}

// 首页重点研报
export function getFocusReportList () {
  return fetch({
    url: '/api/main/focusReportList',
    method: 'get',
    params: { }
  })
}

// 首页养老基金优选数据
export function getMainPensionStrategyFundData () {
  return fetch({
    url: '/api/main/pensionStrategyFund',
    method: 'get'
  })
}

// 首页定投优选基金数据
export function getMainInvestStrategyFundData () {
  return fetch({
    url: '/api/main/investStrategyFund',
    method: 'get',
    params: { }
  })
}
