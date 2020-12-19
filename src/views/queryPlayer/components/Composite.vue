<template>
  <div class="home">
    
    <el-row :gutter="20">
      <el-col :span="8"> 
        <div class="player-name">
          <template v-if="!$commonUtils.isNull($store.getters.playerClanData.tag)">[{{$store.getters.playerClanData.tag}}]</template>{{$store.getters.playerClanData.nickname}}
        </div>
        <div :class="{like:$store.getters.like}"
          @click="$store.dispatch('player/setLike')"
          style="font-size: 16px;cursor: pointer;">
          <i class="el-icon-chicken" style="margin-right:5px;"></i>
          {{$store.getters.likeNum}}
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <div>注册日期</div>
          <div><img class="icon-img" src="~@/assets/composite/regist.png">{{$store.getters.playerClanData.createdAt}}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <div>最后战斗</div>
          <div><img class="icon-img" src="~@/assets/composite/play.png">{{$store.getters.playerClanData.lastBattleTime}}</div>
        </div>
      </el-col>
    </el-row>
    <el-divider>综合</el-divider>
    <el-row class="info" :gutter="20">
      <el-col :span="8">
        <div>
          <div class="info-title">PVP</div>
          <div><img class="icon-img" src="~@/assets/composite/count.png">{{$store.getters.playerClanData.fightingNum}}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <div class="info-title">胜利</div>
          <div><img class="icon-img" src="~@/assets/composite/win.png">{{$store.getters.playerClanData.winningProbability}}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <div class="info-title">K/D</div>
          <div><img class="icon-img" src="~@/assets/composite/proportion.png">{{$store.getters.playerClanData.killRatio}}</div>
        </div>
      </el-col>
    </el-row>
    <div style="height:10px;"></div>
    <el-row class="info" :gutter="20">
      <el-col :span="8">
        <div>
          <div class="info-title">场均经验</div>
          <div><img class="icon-img" src="~@/assets/composite/exp.png">{{$store.getters.playerClanData.expexperience}}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <div class="info-title">场均伤害</div>
          <div><img class="icon-img" src="~@/assets/composite/damage.png">{{$store.getters.playerClanData.aveDamage}}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <div class="info-title">主炮命中</div>
          <div><img class="icon-img" src="~@/assets/composite/hit.png">{{$store.getters.playerClanData.hitRate}}</div>
        </div>
      </el-col>
    </el-row>
    <el-divider>单野</el-divider>
    <el-row class="info" :gutter="20">
      <el-col :span="8">
        <div>
          <div class="info-title">PVP</div>
          <div><img class="icon-img" src="~@/assets/composite/count.png">{{$store.getters.playerClanData.soloFightingNum}}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <div class="info-title">胜利</div>
          <div><img class="icon-img" src="~@/assets/composite/win.png">{{$store.getters.playerClanData.soloWinningProbability}}</div>
        </div>
      </el-col>
    </el-row>
    <el-divider>自行车</el-divider>
    <el-row class="info" :gutter="20">
      <el-col :span="8">
        <div>
          <div class="info-title">PVP</div>
          <div><img class="icon-img" src="~@/assets/composite/count.png">{{$store.getters.playerClanData.doubleFightingNum}}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <div class="info-title">胜利</div>
          <div><img class="icon-img" src="~@/assets/composite/win.png">{{$store.getters.playerClanData.doubleWinningProbability}}</div>
        </div>
      </el-col>
    </el-row>
    <el-divider>装甲车</el-divider>
    <el-row class="info" :gutter="20">
      <el-col :span="8">
        <div>
          <div class="info-title">PVP</div>
          <div><img class="icon-img" src="~@/assets/composite/count.png">{{$store.getters.playerClanData.threeFightingNum}}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <div class="info-title">胜利</div>
          <div><img class="icon-img" src="~@/assets/composite/win.png">{{$store.getters.playerClanData.threeWinningProbability}}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 综合查询页面
export default {
  name: 'Composite',
  components: {
    
  },
  data() {
    return {
      
    }
  },
  computed: {
  },
  methods:{
  }
    
}
</script>

<style lang="stylus" scoped>
.home{
  height:100%
  width:100%
  max-width:1200px
  padding:0 20px;
  margin:0 auto
}
.player-name{
  font-size: 20px;
  height: 40px;
  line-height: 40px;
}
.icon-img{
  width: 26px;
  position: relative;
  top: 5px;
  margin-right: 15px;
}
.info{
  font-size:20px;
}
.info-title{
  font-size:15px;
}
.like{
  color:rgb(22,194,194)
}
</style>