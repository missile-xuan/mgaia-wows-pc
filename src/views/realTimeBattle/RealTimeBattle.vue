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
          <div class="player-info" v-for="player in showBattle.left" :key="player.id">
            <template v-if="$commonUtils.isNull(player.data)">
              <loading></loading>
            </template>
            <template v-else>
              <div class="shipimg" v-if="player.data=='隐藏战绩或查询失败'">
                隐藏战绩<br>或者<br>查询失败
              </div>
              <div v-else class="shipimg">
                <img class="shipimg" :src="player.data.playerShipData.image">
              </div>
              <div class="player-name">
                <div class="name">{{player.name}}</div>
                <div class="ship" v-if="player.data!='隐藏战绩或查询失败'">{{player.data.playerShipData.shipName}}</div>
              </div>
              <div v-if="player.data!='隐藏战绩或查询失败'">
                <div class="battle-all">
                  <div>
                    总体:
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/count.png">{{player.data.playerClanData.fightingNum}}
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/win.png">{{player.data.playerClanData.winningProbability}}
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/proportion.png">{{player.data.playerClanData.killRatio}}
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/exp.png">{{player.data.playerClanData.expexperience}}
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/damage.png">{{player.data.playerClanData.aveDamage}}
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/hit.png">{{player.data.playerClanData.hitRate}}
                  </div>

                </div>
                <div class="battle-all">
                  <div>
                    单船:
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/count.png">{{player.data.playerShipData.fightingNum}}
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/win.png">{{player.data.playerShipData.winningProbability}}
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/proportion.png">{{player.data.playerShipData.killRatio}}
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/exp.png">{{player.data.playerShipData.expexperience}}
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/damage.png">{{player.data.playerShipData.aveDamage}}
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/hit.png">{{player.data.playerShipData.hitRate}}
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="center"></div>
        <div class="right">
          <div class="player-info" style="justify-content: flex-start" v-for="player in showBattle.right" :key="player.id">
            <template v-if="$commonUtils.isNull(player.data)">
              <loading></loading>
            </template>
            <template v-else>
              <div class="shipimg" v-if="player.data=='隐藏战绩或查询失败'">
                隐藏战绩或查询失败
              </div>
              <div v-else class="shipimg">
                <img class="shipimg" :src="player.data.playerShipData.image">
              </div>
              <div class="player-name">
                <div class="name">{{player.name}}</div>
                <div class="ship" v-if="player.data!='隐藏战绩或查询失败'">{{player.data.playerShipData.shipName}}</div>
              </div>
              <div v-if="player.data!='隐藏战绩或查询失败'">
                <div class="battle-all">
                  <div>
                    总体:
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/count.png">{{player.data.playerClanData.fightingNum}}
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/win.png">{{player.data.playerClanData.winningProbability}}
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/proportion.png">{{player.data.playerClanData.killRatio}}
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/exp.png">{{player.data.playerClanData.expexperience}}
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/damage.png">{{player.data.playerClanData.aveDamage}}
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/hit.png">{{player.data.playerClanData.hitRate}}
                  </div>

                </div>
                <div class="battle-all">
                  <div>
                    单船:
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/count.png">{{player.data.playerShipData.fightingNum}}
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/win.png">{{player.data.playerShipData.winningProbability}}
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/proportion.png">{{player.data.playerShipData.killRatio}}
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/exp.png">{{player.data.playerShipData.expexperience}}
                  </div>
                  <div>
                    <img class="icon-img" src="~@/assets/composite/damage.png">{{player.data.playerShipData.aveDamage}}
                  </div>
                  <div>
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
      battleActive:'now'
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
    display:flex
    justify-content:space-between

    .left{
      min-width 720px
      flex 1
    }
    .right{
      min-width 720px
      flex 1
    }
  }
}
.player-name{
  width:160px;

  .name{
    height 35px
    line-height 35px
  }
  .ship{
    height 35px
    line-height 35px
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
  height: 70px;
  width:120px;
}
.battle-all{
  display:flex
}
.battle-all>div{
  height 35px
  line-height 35px
}
.battle-all>div:nth-child(2){
  width:60px
}
.battle-all>div:nth-child(3){
  width:115px
}
.battle-all>div:nth-child(4){
  width:58px
}
.battle-all>div:nth-child(5){
  width:55px
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
</style>