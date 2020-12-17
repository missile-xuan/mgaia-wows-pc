const state = {
  rawData:{},
}

const mutations = {
  SET_ROW_DATA: (state, rawData) => {
    state.rawData = rawData
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