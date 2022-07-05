import {findPlayerTealTimeBattleOverallData,findShipParameterByShipId} from '@/api/wowsBattle.js'
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
  async addBattleTeam({commit},dataJston){
    console.log('添加战斗团队')
    let AirCarrier = [] //航母
    let Battleship = [] //战列
    let Cruiser = [] //巡洋
    let Destroyer = [] //驱逐舰

    for(let player of dataJston.vehicles){
      player.dateTime = dataJston.dateTime
      //获取船只参数
      await findShipParameterByShipId({shipId:player.shipId}).then((response) => {
        player.ship=response
      }).catch(error=>{
        console.log(error)
      })
      // 舰种筛选
      switch(player.ship?.shipType){
        case "AirCarrier" :
          AirCarrier.push(player)
          break
        case "Battleship" :
          Battleship.push(player)
          break
        case "Cruiser" :
          Cruiser.push(player)
          break
        case "Destroyer" :
          Destroyer.push(player)
          break
      }
    }
    // 等级筛选
    function compare(previous,next){
      if (previous.ship.shipGrade < next.ship.shipGrade) {
        return 1;
      } else if (previous.ship.shipGrade > next.ship.shipGrade) {
        return -1;
      } else {
        return 0;
      }
    }

    AirCarrier.sort(compare)
    Battleship.sort(compare)
    Cruiser.sort(compare)
    Destroyer.sort(compare)
    
    for(let player of AirCarrier){
      state.battleTeam[player.name]={...player}  
    }
    for(let player of Battleship){
      state.battleTeam[player.name]={...player}  
    }
    for(let player of Cruiser){
      state.battleTeam[player.name]={...player}  
    }
    for(let player of Destroyer){
      state.battleTeam[player.name]={...player}  
    }
    commit("SET_BATTLE_TEAM",state.battleTeam);
  },
  // 获取战斗数据
  setBattleTeamData({commit}){
    console.log('获取战斗数据')
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