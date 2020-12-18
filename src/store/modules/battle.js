import {findPlayerTealTimeBattleOverallData} from '@/api/wowsBattle.js'
import commonUtils from '@/utils/commonUtils.js'
import store from '@/store'
const state = {
  // 原始数据
  rawData:{},
  battleTeam:{},
  historyBattleTeam:[],
}

const mutations = {
  SET_ROW_DATA: (state, rawData) => {
    state.rawData = rawData
  },
  SET_BATTLE_TEAM: (state, battleTeam) => {
    state.battleTeam = battleTeam
  },
  SET_HISTORY_BATTLE_TEAM:(state, historyBattleTeam)=>{
    state.historyBattleTeam=historyBattleTeam
  }
}
const actions = {
  // 清除当前战斗团队
  deleteBattleTeam({commit}){
    let keys = Object.keys(state.battleTeam)
    if(keys.length==0){return}
    let key = keys[0]
    let historyBattleTeam ={}
    historyBattleTeam[state.battleTeam[key].dateTime] = state.battleTeam
    state.historyBattleTeam.unshift(historyBattleTeam)
    commit("SET_HISTORY_BATTLE_TEAM",state.historyBattleTeam);
    commit("SET_BATTLE_TEAM",{});
  },
  // 添加战斗团队
  addBattleTeam({commit},dataJston){
    console.log(dataJston.dateTime)
    for(let player of dataJston.vehicles){
      player.dateTime = dataJston.dateTime
      state.battleTeam[player.name]={...player}
    }
    commit("SET_BATTLE_TEAM",state.battleTeam);
    console.log(state.battleTeam)
  },
  // 获取战斗数据
  setBattleTeamData({commit}){
    for(let nickname in state.battleTeam){
      if(nickname[0]==':'){
        // 机器人
        state.battleTeam[nickname].data="机器人"
        commit("SET_BATTLE_TEAM",state.battleTeam);
        continue
      }
      findPlayerTealTimeBattleOverallData({nickname:nickname,shipId:state.battleTeam[nickname].shipId,server:store.getters.server}).then((response) => {
        state.battleTeam[nickname].data=response
        commit("SET_BATTLE_TEAM",commonUtils.deepCopy(state.battleTeam));
      }).catch(error=>{
        console.log(error)
        console.log(nickname)
        state.battleTeam[nickname].data="隐藏战绩或查询失败"
        commit("SET_BATTLE_TEAM",commonUtils.deepCopy(state.battleTeam));
      })
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}