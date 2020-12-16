import router from './router'
import store from './store'
import commonUtils from '@/utils/commonUtils.js'
const Store = window.require('electron-store');
const electronStore = new Store();
router.beforeEach(async (to, from, next) => {
	if(to.path === '/login'){
		next()
	}else{
		if(commonUtils.isNull(store.getters.openid)){
			let cust = electronStore.get("cust")
			console.log(cust)
			if(commonUtils.isNull(cust) || commonUtils.isNull(cust.openid)){
				next('/login')
			}else{
				store.commit('cust/SET_OPENID',cust.openid)
				store.commit('cust/SET_NICK_NAME',cust.nickName)
				store.commit('cust/SET_AVATAR_URL',cust.avatarUrl)
				store.commit('cust/SET_APPID',cust.appid)
				next()
			}
		}
		next()
	}
})