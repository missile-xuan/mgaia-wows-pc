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

  //玩家
  playerForm: state => state.player,
  playerClanData:state => state.player.playerClanData,
  likeNum: state => state.player.likeNum,
  like: state => state.player.like,
  playerCustomData:state => state.player.playerCustomData,
  shipDataList:state => state.player.shipDataList,
}
export default getters