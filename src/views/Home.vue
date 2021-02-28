<template>
  <div class="home">
    <el-container style="height:100%">
      <el-header class="home-menu-div el-badge__content--primary" style="" height="60px">
        <div class="left-title-div">
          <div class="title" style="">WOWS憨批伴侣</div>
        </div>
        <div style="flex:1;padding: 0;">
          <el-menu 
            :default-active="$route.fullPath" 
            mode="horizontal"
            background-color="#3D516B"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-menu-item index="/realTimeBattle">实时战斗</el-menu-item>
            <el-menu-item index="/queryPlayer">查询</el-menu-item>
            <el-menu-item index="/help">说明</el-menu-item>
          </el-menu>
        </div>
        <div style="display:flex;justify-content:center;padding-right: 20px;">
          <div style="    padding: 13px 20px 0 0;">
            <el-button  icon="el-icon-search" @click="findPlayerDialogVisible=true" size="small">{{$store.getters.playerForm.nickname}}</el-button>
            <el-dialog
              title="搜索玩家"
              :visible.sync="findPlayerDialogVisible"
              width="50%">
              <el-row :gutter="20">
                <el-col :span="12"><el-input v-model="findPlayer" size="small" @change="findPlayerFn" placeholder="玩家昵称"></el-input></el-col>
                <el-col :span="6"><el-button  icon="el-icon-search" @click="findPlayerFn" size="small">搜索</el-button></el-col>
              </el-row>
              <el-divider></el-divider>
              <el-table
                v-loading="loadingTable"
                :data="playerTableData"
                height="500px"
                style="width: 100%; "
                @row-dblclick="playerClick">
                <el-table-column
                  prop="nickname"
                  label="nickname">
                </el-table-column>
                <el-table-column
                  prop="account_id"
                  label="account_id">
                </el-table-column>
              </el-table>
              <el-divider>双击选中玩家</el-divider>
            </el-dialog>
          </div>
          <el-dropdown trigger="click">
            <div style="display:flex;cursor: pointer;color:white;">
              <el-avatar :size="30" style="margin-top: 15px;" :src="$store.getters.avatarUrl"></el-avatar>
              <div style="line-height: 60px;margin-left:10px;">{{$store.getters.nickName}}</div>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="setRealBattlePath" style="padding: 0 20px;width: 60px;">配置地址</el-dropdown-item>
              <el-dropdown-item @click.native="logout()" style="padding: 0 20px;width: 60px;">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>      
          <!-- 服务器选择 -->
          <el-dropdown trigger="click">
            <div style="display:flex;cursor: pointer;color:white;">
              <div style="line-height: 60px;margin-left:10px;">{{ $commonUtils.getDictionariesLabel("Server",$store.getters.server) }}</div>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-for="server in $dictionaries.get('Server')" 
                :key="server.value" style="padding: 0 20px;width: 60px;"
                @click.native="setServer(server.value)"
              >
                {{server.label}}
              </el-dropdown-item>
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
 import {wowsApiForward} from '@/api/wowsBattle.js'
const fs = window.require('fs')
export default {
  name: 'Home',
  components: {
  },
  data() {
    return {
      activeRoute:'',
      loopTask:null,
      findPlayerDialogVisible:false,
      findPlayer:'',
      playerTableData:[],
      loadingTable:false
    }
  },
  created:function(){
    if(this.$commonUtils.isNull( this.$electronStore.get("showItemList"))){
      this.$commonUtils.isNull( this.$electronStore.set("showItemList",this.$dictionaries.get('ShowItemList')))
    }
    if(!this.$commonUtils.isNull( this.$electronStore.get("server"))){
      this.setServer(this.$electronStore.get("server"))
    }
    

    this.$store.commit('wowsConfig/SET_REAL_BATTLE_PATH',this.$electronStore.get("realBattlePath"))
    this.activeRoute=this.$route.fullPath;

    // 循环调用
    this.loopTask  = setInterval(()=>{
      fs.exists( this.$store.getters.realBattlePath+'/tempArenaInfo.json',(exists)=>{
        if(exists){
          this.analyticBattleJson()
        }else{
          console.log("未开始战斗");
        }
      });
    },5000)
    
  },
  // 销毁
  beforeDestroy(){
    console.log("触发销毁")
    clearInterval(this.loopTask)
  },
  methods:{
    // 解析实施战斗文件
    async analyticBattleJson(){
      const data = fs.readFileSync(this.$store.getters.realBattlePath+'/tempArenaInfo.json', 'utf-8');
      JSON.stringify
      if(this.$store.getters.rawData== data){
        console.log("相等")
        return
      }
      let dataJston = JSON.parse(data);
      this.$store.commit('battle/SET_ROW_DATA',data)
      //解析逻辑开始
      //清除战斗团队
      this.$store.dispatch('battle/deleteBattleTeam')
      //添加战斗团队
      await this.$store.dispatch('battle/addBattleTeam',dataJston)
      // 获取战斗团队数据
      this.$store.dispatch('battle/setBattleTeamData')
    },
    // 设置配置地址
    async setRealBattlePath(){
      // 打开文件夹的文档
      // https://www.electronjs.org/docs/api/dialog#dialogshowopendialogbrowserwindow-options
      let path = await  this.$remote.dialog.showOpenDialog({
        properties: ['openDirectory'],
      });
      console.log(path)
      if(path.filePaths.length==0){return}
      this.$store.commit('wowsConfig/SET_REAL_BATTLE_PATH',path.filePaths[0])
      // 落地
      this.$electronStore.set("realBattlePath",path.filePaths[0])
    },
    // 搜索玩家
    findPlayerFn(){
      this.loadingTable=true
      let url = 'https://api.worldofwarships.'+this.$store.getters.server+'/wows/account/list/?search='+this.findPlayer
      wowsApiForward({url:url}).then((response) => {
        console.log(response)
        this.playerTableData=response.data
        this.loadingTable=false
      }).catch(error=>{
        console.log(error)
        this.playerTableData=[]
        this.loadingTable=false
      })

    },
    // 选中
    playerClick(row, column, event){
      console.log( row, column, event)
      this.$store.commit('player/SET_NICKNAME',row.nickname)
      this.$store.commit('player/SET_ACCOUNT_ID',row.account_id)
      this.$store.dispatch('player/initData')
      this.findPlayerDialogVisible=false
    },
    // 设置服务器
    setServer(server){
      this.$electronStore.set("server",server)
      this.$store.commit('cust/SET_SERVER',server)
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
.home{
  height:100%
}
.body-container{
  overflow: auto;
}
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