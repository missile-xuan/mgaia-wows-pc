import request from '@/utils/request.js'

// 拉取新uuid
export function getNewUuid(data) {
  return request.post('/wechatLogin/getNewUuid',data);
}


// 通过uuid拉取登录信息
export function pullWechatLoginByUuid(data) {
  return request.post('/wechatLogin/pullWechatLoginByUuid',data);
}
// 通过uuid拉取登录信息
export function obsoleteQRcode(data) {
  return request.post('/wechatLogin/obsoleteQRcode',data);
}

