import fetch from '@/utils/fetch'

// 登陆
export function login (phoneNumber, password) {
  return fetch({
    url: '/api/user/login',
    method: 'post',
    data: {
      phoneNumber,
      password
    }
  })
}

// 登出
export function logout () {
  return fetch({
    url: '/api/user/logout',
    method: 'get'
  })
}

// 获取用户信息
export function getInfo () {
  return fetch({
    url: '/api/user/info',
    method: 'get'
  })
}

// ******************** 注册 ************************* //
// 验证手机号是否已注册
export function verifyPhoneNumber (phoneNumber) {
  return fetch({
    url: '/api/user/register/verifyPhoneNumber',
    method: 'post',
    data: {
      phoneNumber
    }
  })
}

// 获取验证图片id
export function getVerifyImageId () {
  return fetch({
    url: '/api/user/register/getVerifyImageId',
    method: 'get'
  })
}

// 请求发送验证短信
export function requestSendVerifySms (phoneNumber, imageId, imageValue) {
  return fetch({
    url: '/api/user/register/requestSendVerifySms',
    method: 'post',
    data: {
      phoneNumber,
      imageId,
      imageValue
    }
  })
}

// 注册
export function register (phoneNumber, password, smsValue) {
  return fetch({
    url: '/api/user/register',
    method: 'post',
    data: {
      phoneNumber,
      password,
      smsValue
    }
  })
}
