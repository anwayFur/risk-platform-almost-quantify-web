import router from './router'
import store from './store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { MessageBox } from 'element-ui'

const NeedLoginList = ['funds', 'stocks', 'analysis'] // 需要登录的页面

router.beforeEach((to, from, next) => {
  NProgress.start()
  // 判断是否需要登陆 判断是否有用户名
  if (NeedLoginList.indexOf(to.path.split('/')[1]) !== -1 && store.getters.name === null) {
    MessageBox.confirm('该功能仅对注册用户开放，请登陆或注册！', {
      confirmButtonText: '确定',
      showCancelButton: false,
      // cancelButtonText: '取消',
      type: 'warning'
    })
  } else {
    next()
  }
  NProgress.done() // router在hash模式下 手动改变hash 重定向回来 不会触发afterEach 暂时hack方案 ps：history模式下无问题，可删除该行！
})

router.afterEach(() => {
  NProgress.done() // 结束Progress
})
