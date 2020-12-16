const state = {
    openid: '',
    nickName: '',
    // 头像
    avatarUrl: '',
    appid:''
}

const mutations = {
    SET_OPENID: (state, openid) => {
        state.openid = openid
    },
    SET_NICK_NAME: (state, nickName) => {
        state.nickName = nickName
    },
    SET_AVATAR_URL: (state, avatarUrl) => {
        state.avatarUrl = avatarUrl
    },
    SET_APPID: (state, appid) => {
      state.appid = appid
    }
}
const actions = {
    
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}