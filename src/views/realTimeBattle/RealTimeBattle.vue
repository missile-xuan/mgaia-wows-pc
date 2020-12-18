<template>
  <div class="home">
    <div v-if="$commonUtils.isNull($store.getters.realBattlePath)" >
      <div>实时战斗无法使用,请先配置wows录像文件路径</div>
      <el-button @click="setRealBattlePath">设置路径</el-button>
    </div>
    <!-- <div>{{$store.getters.battleTeam}}</div> -->
    <div v-else class="battle-div">
      <!-- 左边列表 -->
      <div class="battle-list el-badge__content--primary">
        <div :class="{'battle-button':true,active:battleActive=='now'}"
          @click="setBattleData('now')"
        >当前</div>
        <div :class="{'battle-button':true,active:battleActive==historyBattle}"
          v-for="historyBattle in $store.getters.historyBattleTeam"
          :key="Object.keys(historyBattle)[0]"
          @click="setBattleData(historyBattle)"
        >
          {{formatDateTime(historyBattle)}}
        </div>
      </div>
      <div class="battle-info">
        <div v-show="battleActive=='now'">{{$store.getters.battleTeam}}</div>
        <div v-show="battleActive!='now'">{{battleData}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
// 实时战斗页面
export default {
  name: 'RealTimeBattle',
  components: {
  },
  data() {
    return {
      battleData:this.$store.getters.battleTeam,
      battleActive:'now'
    }
  },
  methods:{
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
    // 设置显示
    setBattleData(active){
      console.log("active",active)
      this.battleActive = active
      if(active == 'now'){
        this.battleData = this.$store.getters.battleTeam
      }else{
        let key = Object.keys(active)[0]
        this.battleData = active[key]
      }
    },

    formatDateTime(setBattleData){
      let key = Object.keys(setBattleData)[0]
      
      // 18.12.2020 10:22:23
      return moment(key,"D.M.YYYY hh:mm:ss").format("YYYY.M.D h:mm:ss")
    }
  }
}
</script>

<style lang="stylus" scoped>
.home{
  height:100%
  width:100%
}
.battle-div{
  height:100%
  display:flex
  flex-direction: row;
  flex: 1;

  .battle-list{
    width:250px;
    overflow:auto

    .battle-button{
      // background: #243449;
      color:white;
      opacity:0.8
      cursor: pointer;
      height:28px;
      line-height:28px;
      padding-left:20px
    }
    .active{
      background: #617188;
      opacity:1
    }
  }
  .battle-info{
    flex:1
    overflow:auto
  }
}
</style>