const state = {
    openid: '',
    nickName: '未授权',
    // 头像
    avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
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