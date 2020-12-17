const getters = {
  openid: state => state.cust.openid,
  avatarUrl: state => state.cust.avatarUrl,
  nickName : state => state.cust.nickName,

  realBattlePath: state => state.wowsConfig.realBattlePath,

  // 解析出来的原始数据
  rawData: state => state.battle.rawData
}
export default getters