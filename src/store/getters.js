const getters = {
  openid: state => state.cust.openid,
  avatarUrl: state => state.cust.avatarUrl,
  nickName : state => state.cust.nickName,
  server : state => state.cust.server,

  realBattlePath: state => state.wowsConfig.realBattlePath,

  // 解析出来的原始数据
  rawData: state => state.battle.rawData,
  battleTeam: state => state.battle.battleTeam,
  historyBattleTeam: state => state.battle.historyBattleTeam,
}
export default getters