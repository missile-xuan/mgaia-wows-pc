<template>
  <div class="home">
    <div v-if="$commonUtils.isNull($store.getters.realBattlePath)" >
      <div>实时战斗无法使用,请先点击用户名配置wows录像文件路径<br>
          steam例如：D:\SteamLibrary\steamapps\common\World of Warships\replays
      </div>
    </div>
    <!-- <div>{{$store.getters.battleTeam}}</div> -->
    
    <div v-else class="battle-div">
      <!-- 左边列表 -->
      <div class="battle-list el-badge__content--primary">
        <div style="text-align: center;padding: 10px;"><el-button style="width:100%" @click="$store.dispatch('battle/setBattleTeamData')" size="small">重载最新数据</el-button></div>
        
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
        
        <div class="left">
          <div class="remind">
            <el-input style="width:200px;" v-model="darkSearch" size="small" placeholder="ID模糊搜索"></el-input>
            <div style="margin-left:10px"> 提醒：双击id可跳转战绩详情</div>
          </div>
          <div class="player-info" v-for="player in showBattle.left" :key="player.id">
            <template v-if="$commonUtils.isNull(player.data)">
              <loading></loading>
            </template>
            <template v-else>
              <div class="shipimg" v-if="player.data=='隐藏战绩或查询失败'">
                隐藏战绩<br>或者<br>查询失败
              </div>
              <div class="shipimg" v-else-if="player.data.playerShipData==null">
                无法查询到船只
              </div>
              <div v-else class="shipimg-div">
                <img class="shipimg" :src="player.data.playerShipData.image" >
                <div v-if="player.data!='隐藏战绩或查询失败'&&player.data.playerShipData!=null">{{player.data.playerShipData.shipName}}</div>
              </div>
              <div :class="{'player-name':true,find:fuzzySearch(player.name,darkSearch)}"  @dblclick="playerClick(player)">
                <div>
                  <div v-if="!$commonUtils.isNull(player.data.playerClanData)&&!$commonUtils.isNull(player.data.playerClanData.tag)" class="name">
                    [{{player.data.playerClanData.tag}}]
                  </div>
                  <div class="name">{{player.name}}</div>
                </div>
              </div>
              <div v-if="player.data!='隐藏战绩或查询失败'">
                <div class="battle-all" v-if="player.data.playerClanData!=null">
                  <div>
                    总体:
                  </div>
                  <div v-show="showItemList.indexOf('场次')!=-1">
                    <img class="icon-img" src="~@/assets/composite/count.png">{{player.data.playerClanData.fightingNum}}
                  </div>
                  <div v-show="showItemList.indexOf('胜利')!=-1" :class="getColor(player.data.playerClanData.winningProbability)">
                    <img class="icon-img" src="~@/assets/composite/win.png">{{player.data.playerClanData.winningProbability}}
                  </div>
                  <div v-show="showItemList.indexOf('K/D')!=-1">
                    <img class="icon-img" src="~@/assets/composite/proportion.png">{{player.data.playerClanData.killRatio}}
                  </div>
                  <div v-show="showItemList.indexOf('经验')!=-1">
                    <img class="icon-img" src="~@/assets/composite/exp.png">{{player.data.playerClanData.expexperience}}
                  </div>
                  <div v-show="showItemList.indexOf('场均')!=-1">
                    <img class="icon-img" src="~@/assets/composite/damage.png">{{player.data.playerClanData.aveDamage}}
                  </div>
                  <div v-show="showItemList.indexOf('命中')!=-1">
                    <img class="icon-img" src="~@/assets/composite/hit.png">{{player.data.playerClanData.hitRate}}
                  </div>

                </div>
                <div class="battle-all" v-if="player.data.playerShipData!=null">
                  <div>
                    单船:
                  </div>
                  <div v-show="showItemList.indexOf('场次')!=-1">
                    <img class="icon-img" src="~@/assets/composite/count.png">{{player.data.playerShipData.fightingNum}}
                  </div>
                  <div v-show="showItemList.indexOf('胜利')!=-1">
                    <img class="icon-img" src="~@/assets/composite/win.png">{{player.data.playerShipData.winningProbability}}
                  </div>
                  <div v-show="showItemList.indexOf('K/D')!=-1">
                    <img class="icon-img" src="~@/assets/composite/proportion.png">{{player.data.playerShipData.killRatio}}
                  </div>
                  <div v-show="showItemList.indexOf('经验')!=-1">
                    <img class="icon-img" src="~@/assets/composite/exp.png">{{player.data.playerShipData.expexperience}}
                  </div>
                  <div v-show="showItemList.indexOf('场均')!=-1">
                    <img class="icon-img" src="~@/assets/composite/damage.png">{{player.data.playerShipData.aveDamage}}
                  </div>
                  <div v-show="showItemList.indexOf('命中')!=-1">
                    <img class="icon-img" src="~@/assets/composite/hit.png">{{player.data.playerShipData.hitRate}}
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="center"></div>
        <div class="right">
          <div class="remind" >
            <el-checkbox-group v-model="showItemList" @change="setShowItemList">
              <el-checkbox v-for="item in  $dictionaries.get('ShowItemList')" :label="item" :key="item">{{item}}</el-checkbox>
            </el-checkbox-group>
          </div>
          <div class="player-info" style="justify-content: flex-start" v-for="player in showBattle.right" :key="player.id">
            <template v-if="$commonUtils.isNull(player.data)">
              <loading></loading>
            </template>
            <template v-else>
              <div class="shipimg" v-if="player.data=='隐藏战绩或查询失败'">
                隐藏战绩<br>或者<br>查询失败
              </div>
              <div class="shipimg" v-else-if="player.data.playerShipData==null">
                无法查询到船只
              </div>
              <div v-else class="shipimg-div">
                <img class="shipimg" :src="player.data.playerShipData.image">
                <div class="" v-if="player.data!='隐藏战绩或查询失败'&&player.data.playerShipData!=null">{{player.data.playerShipData.shipName}}</div>
              </div>
              <div :class="{'player-name':true,find:fuzzySearch(player.name,darkSearch)}" @dblclick="playerClick(player)">
                <div>
                  <div v-if="!$commonUtils.isNull(player.data.playerClanData)&&!$commonUtils.isNull(player.data.playerClanData.tag)" class="name">
                    [{{player.data.playerClanData.tag}}]
                  </div>
                  <div class="name">{{player.name}}</div>
                </div>
              </div>
              <div v-if="player.data!='隐藏战绩或查询失败'">
                <div class="battle-all" v-if="player.data.playerClanData!=null">
                  <div>
                    总体:
                  </div>
                  <div v-show="showItemList.indexOf('场次')!=-1">
                    <img class="icon-img" src="~@/assets/composite/count.png">{{player.data.playerClanData.fightingNum}}
                  </div>
                  <div v-show="showItemList.indexOf('胜利')!=-1" :class="getColor(player.data.playerClanData.winningProbability)">
                    <img class="icon-img" src="~@/assets/composite/win.png">{{player.data.playerClanData.winningProbability}}
                  </div>
                  <div v-show="showItemList.indexOf('K/D')!=-1">
                    <img class="icon-img" src="~@/assets/composite/proportion.png">{{player.data.playerClanData.killRatio}}
                  </div>
                  <div v-show="showItemList.indexOf('经验')!=-1">
                    <img class="icon-img" src="~@/assets/composite/exp.png">{{player.data.playerClanData.expexperience}}
                  </div>
                  <div v-show="showItemList.indexOf('场均')!=-1">
                    <img class="icon-img" src="~@/assets/composite/damage.png">{{player.data.playerClanData.aveDamage}}
                  </div>
                  <div v-show="showItemList.indexOf('命中')!=-1">
                    <img class="icon-img" src="~@/assets/composite/hit.png">{{player.data.playerClanData.hitRate}}
                  </div>

                </div>
                <div class="battle-all" v-if="player.data.playerShipData!=null">
                  <div>
                    单船:
                  </div>
                  <div v-show="showItemList.indexOf('场次')!=-1">
                    <img class="icon-img" src="~@/assets/composite/count.png">{{player.data.playerShipData.fightingNum}}
                  </div>
                  <div v-show="showItemList.indexOf('胜利')!=-1">
                    <img class="icon-img" src="~@/assets/composite/win.png">{{player.data.playerShipData.winningProbability}}
                  </div>
                  <div v-show="showItemList.indexOf('K/D')!=-1">
                    <img class="icon-img" src="~@/assets/composite/proportion.png">{{player.data.playerShipData.killRatio}}
                  </div>
                  <div v-show="showItemList.indexOf('经验')!=-1">
                    <img class="icon-img" src="~@/assets/composite/exp.png">{{player.data.playerShipData.expexperience}}
                  </div>
                  <div v-show="showItemList.indexOf('场均')!=-1">
                    <img class="icon-img" src="~@/assets/composite/damage.png">{{player.data.playerShipData.aveDamage}}
                  </div>
                  <div v-show="showItemList.indexOf('命中')!=-1">
                    <img class="icon-img" src="~@/assets/composite/hit.png">{{player.data.playerShipData.hitRate}}
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'
import moment from 'moment'
// 实时战斗页面
export default {
  name: 'RealTimeBattle',
  components: {
    Loading
  },
  data() {
    return {
      battleData:this.$store.getters.battleTeam,
      battleActive:'now',
      darkSearch:'',
      showItemList:this.$electronStore.get("showItemList",this.showItemList)
    }
  },
  computed: {
    showBattle: function () {
      let data=null
      let response ={left:[],right:[]}
      
      if(this.battleActive=='now'){
        data = this.$store.getters.battleTeam 
      }else{
        data = this.battleData
      }
      if(Object.keys(data).length==0){return response}
      for(let nickname in data){
        if(data[nickname].relation==2){
          response.right.push(data[nickname])
        }else{
          response.left.push(data[nickname])
        }
      }
      return response;
    }
  },
  methods:{
    
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
    // 选中
    playerClick(player){
      console.log( player)
      if(this.$commonUtils.isNull(player.data)){return}
      this.$store.commit('player/SET_NICKNAME',player.data.nickname)
      this.$store.commit('player/SET_ACCOUNT_ID',player.data.accountId)
      this.$store.dispatch('player/initData')
      this.$router.push('/queryPlayer')
    },
    formatDateTime(setBattleData){
      let key = Object.keys(setBattleData)[0]
      
      // 18.12.2020 10:22:23
      return moment(key,"D.M.YYYY hh:mm:ss").format("YYYY.M.D h:mm:ss")
    },
    getColor(str){
      let num = parseFloat(str.slice(str.indexOf("(")+1,str.indexOf("%")))
      if(num<45){
        return 'd'
      }else if(num<50){
        return 'c'
      }else if(num<55){
        return 'b'
      }else if(num<60){
        return 'a'
      }else{
        return 's'
      }
    },
    setShowItemList(){
      this.$electronStore.set("showItemList",this.showItemList)
    },
    fuzzySearch(name,darkSearch){
      if(this.$commonUtils.isNull(darkSearch)){return false}
      name.toLocaleLowerCase()
      
      if(name.toLocaleLowerCase().indexOf(darkSearch.toLocaleLowerCase())==-1){
        return false
      }

      return true

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
    display:flex
    justify-content:space-between

    .left{
      // min-width 800px
      flex 1
    }
    .right{
      // min-width 800px
      flex 1
    }
  }
}
.remind{
  display flex
  height: 32px;
  line-height: 32px;
  color: $text-color-text-black;
  padding:0 10px;
}
.find{
  background: cadetblue;
}
.player-name{
  height 72px
  width:160px;
  cursor: pointer;
  display flex
  // flex-direction column
  align-items:center 

  .name{
    line-height 20px
    font-weight: 700;
  }
}
.player-info{
  display:flex
  margin:0 0 5px 0
  justify-content:flex-end
}
.player-info:nth-child(odd){
  background:#e1eeff
}
.shipimg{
  height: 45px;
  width:77px;
}
.shipimg-div{
  width: 150px;
  text-align: center;
}
.battle-all{
  display:flex
}
.battle-all>div{
  height 35px
  line-height 35px
}
.battle-all>div:nth-child(1){
  width:40px
}
.battle-all>div:nth-child(2){
  width:60px
}
.battle-all>div:nth-child(3){
  width:125px
}
.battle-all>div:nth-child(4){
  width:58px
}
.battle-all>div:nth-child(5){
  width:65px
}
.battle-all>div:nth-child(6){
  width:70px
}
.battle-all>div:nth-child(7){
  width:50px
}
.icon-img{
  width: 20px;
  position: relative;
  top: 5px;
}
.center{
  width 10px;
  background:#e6e6e6;
}
.s{
  color :#8712e0
}
.a{
  color :#122be0
}
.b{
  color :#4bec08
}
.c{
  
}
.d{
  color :#ff0000
}
</style>