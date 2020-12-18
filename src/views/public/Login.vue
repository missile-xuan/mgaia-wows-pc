<template>
  <div class="home">
    登录页面
    <el-button @click="getNewUuid">拉取</el-button>
    <img :src="qrcodeSrc">
  </div>
</template>

<script>
// getNewUuid
import {getNewUuid,pullWechatLoginByUuid,obsoleteQRcode} from '@/api/wechartLogin.js'
import QRCode  from 'qrcode'
export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      uuid:'',
      qrcodeSrc:''
    }
  },
  watch:{
    // uuid变动时候更新二维码
    uuid(){
      QRCode.toDataURL(this.uuid).then(url => {
        console.log(url)
        this.qrcodeSrc = url
      }).catch(err => {
        console.error(err)
      })
    }
  },
  created: function() {
    this.getNewUuid()
    // 循环调用
    let pullInfo = setInterval(()=>{
      if(!this.$commonUtils.isNull(this.uuid)){
        pullWechatLoginByUuid({uuid:this.uuid}).then((response) => {
          console.log("拉取")
          if(!this.$commonUtils.isNull(response.openid)){
            console.log(response)
            clearInterval(pullInfo)
            // 写入vuex
            this.$store.commit('cust/SET_OPENID',response.openid)
            this.$store.commit('cust/SET_NICK_NAME',response.nickName)
            this.$store.commit('cust/SET_AVATAR_URL',response.avatarUrl)
            this.$store.commit('cust/SET_APPID',response.appid)
            // 落地
            this.$electronStore.set("cust",response)

            //报告服务器
            obsoleteQRcode(response).then((response) => {
              response
              // 登录成功
              this.$router.push('/')
            })
          }
        })
      }
    },5000)

    
  },
  methods:{
    getNewUuid(){
      getNewUuid({}).then((response) => {
        this.uuid=response
        console.log(response)
      })
    }
  }
}
</script>
