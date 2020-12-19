<template>
  <div class="home">
    
    <el-card class="box-card">
      <div style="text-align: center;">
        <el-image
        style="height:200px;width:200px"
        :src="qr"
        :preview-src-list="[qr]"></el-image>
      </div>
      <el-divider>通过憨批助手小程序扫下方二维码登录</el-divider>
      <div style="height:60px;"></div>
      <div style="text-align: center;">
        <el-image
        style="height:200px;width:200px"
        :src="qrcodeSrc"
        :preview-src-list="[qrcodeSrc]">
        </el-image>
      </div>
      <div style="text-align: center;"><el-button @click="getNewUuid">刷新二维码</el-button></div>
      
    </el-card>
    <div style="width: 20px;height: 20px; position: absolute;top: 0;" 
      @dblclick="deleteRealBattlePath"></div>
  </div>
</template>

<script>
// getNewUuid
import {getNewUuid,pullWechatLoginByUuid,obsoleteQRcode} from '@/api/wechartLogin.js'
import qr from '@/assets/qrcode.jpg'
import QRCode  from 'qrcode'
export default {
  name: 'Login',
  components: {
  },
  data() {
    return {
      uuid:'',
      qrcodeSrc:'',
      qr:qr
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
    },
    deleteRealBattlePath(){
      this.$electronStore.delete('realBattlePath')
    }
    
  }
}
</script>

<style lang="stylus" scoped>
.home{
  padding-top 100px
}
.box-card{
  width 600px
  height 700px
  margin: 0 auto;
}
</style>