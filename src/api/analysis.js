// 菜单深度分析下的接口
import fetch from '@/utils/fetch'

// 获取研报分析数据
export function fetchList (queryText) {
  return fetch({
    url: '/api/analysis/reportList',
    method: 'get',
    params: queryText
  })
}

// 根据org_name 查询数据
export function selectGroupByOrgName () {
  return fetch({
    url: '/api/analysis/reportOrgNameList',
    method: 'get',
    params: { }
  })
}

// 根据org_name 查询数据
export function selectStockList () {
  return fetch({
    url: '/api/analysis/stockList',
    method: 'get',
    params: { }
  })
}

// 获取研报月排行
export function reportCalcWithMonth () {
  return fetch({
    url: '/api/analysis/reportCalcWithMonth',
    method: 'get',
    params: { }
  })
}

// 获取月份数据
export function reportMonthList () {
  return fetch({
    url: '/api/analysis/reportMonthList',
    method: 'get',
    params: { }
  })
}

// ******************************** 风险预警 ********************************//
export function submitData (listForm) {
  return fetch({
    url: '/api/analysis/financialWarning',
    method: 'post',
    params: listForm
  })
}

// ******************************** 财报统计分析 ********************************//
// 获取财报统计分析数据
export function getFinanceReportStatisticData (listForm) {
  return fetch({
    url: '/api/analysis/getFinanceReportStatisticData',
    method: 'get',
    params: listForm
  })
}

// 按行业获取股票数据
export function getIndustryStockListData (hy) {
  return fetch({
    url: '/api/analysis/getIndustryStockListData',
    method: 'get',
    params: { hy }
  })
}
