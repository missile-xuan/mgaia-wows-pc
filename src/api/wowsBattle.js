import request from '@/utils/request.js'


// 获取船只参数
export function findShipParameterByShipId(data) {
  return request.post('/wowsInfoPc/findShipParameterByShipId',data);
}


// 实时战斗查询战绩
export function findPlayerTealTimeBattleOverallData(data) {
  return request.post('/wowsInfoPc/findPlayerTealTimeBattleOverallData',data);
}

// 实时搜索玩家
export function wowsApiForward(data) {
  return request.post('/wowsInfo/wowsApiForward',data);
}

// 查询玩家综合战绩
export function findPlayerByAccountId(data) {
  return request.get('/wowsInfo/findPlayerByAccountId',data);
}

// 查询玩家船只战绩
export function findPlayerShipStatistic(data) {
  return request.get('/wowsInfo/findPlayerShipStatistic',data);
}

// 自定义查询玩家综合战绩
export function findPlayerCustomStatistics(data) {
  return request.get('/wowsInfo/findPlayerCustomStatistics',data);
}

// 查询玩家点赞数
export function findLikeCount(data) {
  return request.get('/wowsInfo/findLikeCount',data);
}

// 设置点赞
export function setLike(data) {
  return request.get('/wowsInfo/setLike',data);
}

// 查询用户点赞
export function findPlayerLike(data) {
  return request.get('/wowsInfo/findPlayerLike',data);
}

// 通知
export function notice(data) {
  return request.get('/wowsInfo/notice',data);
}
