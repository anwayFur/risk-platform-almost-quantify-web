import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout.vue' // layout

const _import = require('./_import_' + process.env.NODE_ENV)

Vue.use(Router)

/**
 * icon : the icon show in the sidebar
 * hidden : if `hidden:true` will not show in the sidebar
 * redirect : if `redirect:noredirect` will not redirct in the levelbar
 * noDropdown : if `noDropdown:true` will not has submenu in the sidebar
 * meta : `{ role: ['admin'] }`  will control the page role
 **/
export const constantRouterMap = [
  // 根目录重定向到首页
  {path: '/', redirect: '/index', hidden: true},
  // 首页
  {
    path: '',
    component: Layout,
    redirect: 'index',
    icon: 'total1',
    noDropdown: true,
    children: [
      {path: 'index', name: '首页', component: _import('homepage/homepage'), hidden: true}
    ]
  },
  // 基金统计页面
  {
    path: '/funds',
    component: Layout,
    name: '基金',
    icon: 'wealth',
    children: [
      {path: 'fixedInvestment', name: '定投优选', component: _import('fund/fixedInvestment')},
      {path: 'pension', name: '养老优选', component: _import('fund/pension')}
    ]
  },
  // 股票统计页面
  {
    path: '/stocks',
    component: Layout,
    name: '股票',
    icon: 'stock',
    children: [
      {path: 'stockHotspot', name: '股票热点', component: _import('stock/hotspot/hotspot')},
      {path: 'oddsPrompt', name: '机会提醒', component: _import('stock/stockPrompt/odds')},
      {path: 'riskPrompt', name: '风险预警', component: _import('stock/stockPrompt/risk')},
      {path: 'focusReport', name: '重点研报', component: _import('stock/focusReport/FocusReport')},
      {path: 'preferred', name: '财报优选', component: _import('stock/financeReport/preferred')}
    ]
  },
  // 深度分析
  {
    path: '/analysis',
    component: Layout,
    name: '分析工具',
    icon: 'chart',
    children: [
      {path: 'report', name: '历史研报分析', component: _import('analysis/report')},
      {path: 'reportMonth', name: '研报统计数据', component: _import('analysis/reportMonth')},
      {path: 'financeWarning', name: '财务预警工具', component: _import('analysis/financeWarning')},
      {path: 'financeReportStatistic', name: '财报统计分析', component: _import('analysis/financeReportStatistic')}
    ]
  },
  // 详情页
  {
    path: '/p',
    component: Layout,
    name: '详情页',
    hidden: true,
    children: [
      {path: 'stock/:code', name: '股票详情页', component: _import('stock/detailsPage/stock')},
      {path: 'fund/:code', name: '基金详情页', component: _import('fund/detailsPage/fund')}
    ]
  },
  // 用户相关
  {path: '/login', component: _import('user/login'), hidden: true},
  {path: '/register', component: _import('user/register'), hidden: true},
  // 404
  {path: '/404', component: _import('404'), hidden: true},
  {path: '*', redirect: '/404', hidden: true}
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({y: 0}),
  routes: constantRouterMap
})
