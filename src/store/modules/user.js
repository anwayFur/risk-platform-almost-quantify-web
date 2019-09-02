import {getInfo} from '@/api/user'
import {getToken} from '@/utils/auth'

const user = {
  state: {
    name: ''
  },

  mutations: {
    SET_NAME: (state, name) => {
      state.name = name
    }
  },

  actions: {
    // 获取用户信息
    UpdateUserName ({commit}) {
      return new Promise((resolve, reject) => {
        // 判断是否存在token
        const token = getToken()
        if (token !== undefined && token.length === 32) {
          // 有token的话获取用户信息
          getInfo().then(response => {
            // 判断返回状态
            if (response.stat) {
              commit('SET_NAME', response.data.phonenum)
              resolve(true)
            } else {
              commit('SET_NAME', null)
              resolve(false)
            }
          }).catch(error => {
            reject(error)
          })
        } else {
          commit('SET_NAME', null)
          resolve(false)
        }
      })
    }
  }
}

export default user
