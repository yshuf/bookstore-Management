import request from '../request';

// 修改用户邮箱
export function changeMail (data) {
  return request.post('/organization/userInfo/changeMail', data);
}
// 修改用户手机号
export function changeMobile (data) {
  return request.post('/organization/userInfo/changeMobile', data);
}
// 第三方应用
export function thirdPlatList (params) {
  return request.get('/organization/userInfo/thirdPlatList', { params });
}

// 修改密码
export function changePassword (data) {
  return request.post('/organization/userInfo/changePassword', data);
}
// 发送短信验证码
export function getCodeReq (data) {
  return request.post('/organization/userInfo/sendMobileCode', data);
}

// 修改基本信息
export function changeBasicInfo (data) {
  return request.post('/organization/userInfo/changeBasicInfo', data);
}

// 上传头像
export function uploadHeaderLogo (data, config) {
  return request.upload('/userInfo/uploadHeaderLogo', data, config);
}

// 登录页忘记密码-发送手机验证码
export function getPwdSmsCodeReq (params) {
  return request.get('/organization/sms/sendSmsCodeForgetPassword', { params });
}

// 登录页忘记密码-校验手机验证码
export function verifySmsCodeReq (params) {
  return request.get('/organization/sms/verifySmsCodeForgetPassword', { params });
}

// 登录页忘记密码-修改密码
export function modifyPassword (data) {
  return request.post('/organization/userInfo/forgetPassword', data);
}
