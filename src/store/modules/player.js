import {findPlayerByAccountId,findPlayerShipStatistic,findLikeCount,findPlayerLike,setLike,findPlayerCustomStatistics} from '@/api/wowsBattle.js'
// import commonUtils from '@/utils/commonUtils.js'
import store from '@/store'
const state = {
  nickname: '',
  accountId:'',
  playerClanData:{},
  likeNum:0,
  like:false,

  nation:'',
  shipType:'Battleship',
  minShipGrade:8,
  maxShipGrade:10,
  playerCustomData:{},

  nationShip:'',
  shipTypeShip:'Battleship',
  shipGradeShip:8,
  shipDataList:[]
}

const mutations = {
  SET_NICKNAME: (state, nickname) => {
      state.nickname = nickname
  },
  SET_ACCOUNT_ID: (state, accountId) => {
    state.accountId = accountId
  },
  SET_PLAYER_CLAN_DATA: (state, playerClanData) => {
    state.playerClanData = playerClanData
  },
  SET_LIKE_NUM: (state, likeNum) => {
    state.likeNum = likeNum
  },
  SET_LIKE: (state,like) => {
    state.like = like
  },
// -----------------------------
  SET_NATION: (state,nation) => {
    state.nation = nation
  },
  SET_SHIP_TYPE: (state,shipType) => {
    state.shipType = shipType
  },
  SET_MIN_SHIP_GRADE: (state,minShipGrade) => {
    state.minShipGrade = minShipGrade
  },
  SET_MAX_SHIP_GRADE: (state,maxShipGrade) => {
    state.maxShipGrade = maxShipGrade
  },
  SET_PLAYER_CUSTOM_DATA: (state,playerCustomData) => {
    state.playerCustomData = playerCustomData
  },
  // -------------------
  SET_NATION_SHIP: (state,nationShip) => {
    state.nationShip = nationShip
  },
  SET_SHIP_TYPE_SHIP: (state,shipTypeShip) => {
    state.shipTypeShip = shipTypeShip
  },
  SET_SHIP_GRADE_SHIP: (state,shipGradeShip) => {
    state.shipGradeShip = shipGradeShip
  },
  SET_SHIP_DATA_LIST: (state,shipDataList) => {
    state.shipDataList = shipDataList
  },
}
const actions = {
  findPlayerByAccountId({commit}){
    commit("SET_PLAYER_CLAN_DATA",{});
    findPlayerByAccountId({nickname:state.nickname,accountId:state.accountId,server:store.getters.server}).then((response) => {
      commit("SET_PLAYER_CLAN_DATA",response);
    }).catch(error=>{
      console.log(error)
      commit("SET_PLAYER_CLAN_DATA",false);
    })
    findLikeCount({accountId:state.accountId,server:store.getters.server}).then((response) => {
      commit("SET_LIKE_NUM",response);
    }).catch(error=>{
      console.log(error)
      commit("SET_LIKE_NUM",0);
    })
    findPlayerLike({openid:store.getters.openid,accountId:state.accountId,server:store.getters.server}).then((response) => {
      console.log('playerlike',response)
      if(response==null||response.enable=='false'){
        commit("SET_LIKE",false);
      }else{
        commit("SET_LIKE",true);
      }
    }).catch(error=>{
      commit("SET_LIKE",false);
      console.log(error)
    })
  },
  setLike({dispatch}){
    setLike({openid:store.getters.openid,accountId:state.accountId,server:store.getters.server}).then((response) => {
      console.log(response)
      dispatch("findPlayerByAccountId");
    })
  },
  // 自定义统计
  findPlayerCustomStatistics({commit}){
    commit("SET_PLAYER_CUSTOM_DATA",{});
    findPlayerCustomStatistics({
      server:store.getters.server, 
      nickname:state.nickname,
      accountId:state.accountId,
      nation:state.nation,
      shipType:state.shipType,
      minShipGrade:state.minShipGrade,
      maxShipGrade:state.maxShipGrade
    }).then((response) => {
      console.log(  response)
      commit("SET_PLAYER_CUSTOM_DATA",response);
    }).catch(error=>{
      console.log(error)
      commit("SET_PLAYER_CUSTOM_DATA",false);
    })
  },
  // 重新选择玩家
  initData({dispatch}){
    dispatch('findPlayerByAccountId')
    dispatch("findPlayerCustomStatistics")
    dispatch("findPlayerShipStatistic")
    
  },
  // 查询单船数据
  findPlayerShipStatistic({commit}){
    commit("SET_SHIP_DATA_LIST",[]);
    findPlayerShipStatistic({
      server:store.getters.server, 
      nickname:state.nickname,
      accountId:state.accountId,
      nation:state.nationShip,
      shipType:state.shipTypeShip,
      shipGrade:state.shipGradeShip,
    }).then((response) => {
      console.log(  response)
      commit("SET_SHIP_DATA_LIST",response);
    }).catch(error=>{
      console.log(error)
      commit("SET_SHIP_DATA_LIST",false);
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}