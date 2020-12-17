<template>
  <div class="home">
    <el-container>
      <el-header class="home-menu-div el-badge__content--primary" style="" height="60px">
        <div class="left-title-div">
          <div class="title" style="">品种委员会</div>
        </div>
        <div style="flex:1;padding: 0;">
          <el-menu 
            :default-active="activeRoute" 
            mode="horizontal"
            background-color="#3D516B"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-menu-item index="/realTimeBattle">日度数据整理</el-menu-item>
            <el-menu-item>自定义指标数据</el-menu-item>
            <el-menu-item>日度数据展示</el-menu-item>
          </el-menu>
        </div>
        <div style="display:flex;justify-content:center;padding-right: 20px;">
          <el-dropdown trigger="click">
            <div style="display:flex;cursor: pointer;color:white;">
              <el-avatar :size="30" style="margin-top: 15px;" :src="$store.getters.avatarUrl"></el-avatar>
              <div style="line-height: 60px;margin-left:10px;">{{$store.getters.nickName}}</div>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="logout()" style="padding: 0 20px;width: 60px;">退出</el-dropdown-item>
              <el-dropdown-item @click.native="analyticBattleJson()" style="padding: 0 20px;width: 60px;">解析</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>          
        </div>
      </el-header>
      <el-container class="body-container">
        <router-view class="page-body"/>
      </el-container>
    </el-container>
  </div>
</template>

<script>
const fs = window.require('fs')
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      activeRoute:''
    }
  },
  created:function(){

    this.$store.commit('wowsConfig/SET_REAL_BATTLE_PATH',this.$electronStore.get("realBattlePath"))
    this.activeRoute=this.$route.fullPath;
    fs.exists( this.$store.getters.realBattlePath+'/tempArenaInfo.json',(exists)=>{
      if(exists){
        this.analyticBattleJson()
      }else{
        console.log("未开始战斗");
      }
    });
  },
  methods:{
    // 解析实施战斗文件
    analyticBattleJson(){
      const data = fs.readFileSync(this.$store.getters.realBattlePath+'/tempArenaInfo.json', 'utf-8');
      // JSON.stringify
      // if(this.$store.getters.rawData== data){
      //   console.log("相等")
      //   return
      // }
      let dataJston = JSON.parse(data);
      this.$store.commit('battle/SET_ROW_DATA',data)
      //解析逻辑开始
      for(let player of dataJston.vehicles){
        console.log(player)
      }
      
    },
    //退出
    logout(){
      // 清楚本地缓存
      this.$electronStore.delete('cust');
      this.$store.commit('cust/SET_OPENID','')
      this.$store.commit('cust/SET_NICK_NAME','未授权')
      this.$store.commit('cust/SET_AVATAR_URL','https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png')
      this.$store.commit('cust/SET_APPID','')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="stylus" scoped>
.home-menu-div{
  color:white;
  display:flex;
  justify-content:space-between;
  padding:0;

  .left-title-div{
    width: 250px;
    height: 60px;
    background: #243449;

    .title{
      font-size: 24px;
      text-align: center;
      padding-top: 12px;
    }
  }
}
</style>