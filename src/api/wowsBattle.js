import request from '@/utils/request.js'

// 实时战斗查询战绩
export function findPlayerTealTimeBattleOverallData(data) {
  return request.post('/wowsInfoPc/findPlayerTealTimeBattleOverallData',data);
}

