const state = {
  realBattlePath: '',
}

const mutations = {
  SET_REAL_BATTLE_PATH: (state, realBattlePath) => {
    state.realBattlePath = realBattlePath
  },
}
const actions = {
  
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}