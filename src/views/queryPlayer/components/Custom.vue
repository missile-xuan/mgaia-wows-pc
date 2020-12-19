<template>
  <div class="home">
    <el-row :gutter="20">
      <el-col :span="2"> 
        <div>国家:</div>
      </el-col>
      <el-col :span="4"> 
        <el-select size="small" v-model="nation" placeholder="请选择">
          <el-option
            v-for="item in $dictionaries.get('NationList')"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2"> 
        <div>类型</div>
      </el-col>
      <el-col :span="4"> 
        <el-select size="small" v-model="shipType" placeholder="请选择">
          <el-option
            v-for="item in $dictionaries.get('ShipTypeList')"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="2"> 
        <div>等级</div>
      </el-col>
      <el-col :span="6"> 
        <el-slider
          v-model="shipGradeList"
          range
          show-stops
          :min='1'
          :max="10">
        </el-slider>
      </el-col>
      <el-col :span="4"> 
        <div style="text-align: right;">
          <el-button  icon="el-icon-search" @click="findData" size="small">查询</el-button>
        </div>
      </el-col>
    </el-row>
    <el-divider></el-divider>
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
          <div><img class="icon-img" src="~@/assets/composite/count.png">{{$store.getters.playerCustomData.fightingNum}}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <div class="info-title">胜利</div>
          <div><img class="icon-img" src="~@/assets/composite/win.png">{{$store.getters.playerCustomData.winningProbability}}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <div class="info-title">K/D</div>
          <div><img class="icon-img" src="~@/assets/composite/proportion.png">{{$store.getters.playerCustomData.killRatio}}</div>
        </div>
      </el-col>
    </el-row>
    <div style="height:10px;"></div>
    <el-row class="info" :gutter="20">
      <el-col :span="8">
        <div>
          <div class="info-title">场均经验</div>
          <div><img class="icon-img" src="~@/assets/composite/exp.png">{{$store.getters.playerCustomData.expexperience}}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <div class="info-title">场均伤害</div>
          <div><img class="icon-img" src="~@/assets/composite/damage.png">{{$store.getters.playerCustomData.aveDamage}}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <div class="info-title">主炮命中</div>
          <div><img class="icon-img" src="~@/assets/composite/hit.png">{{$store.getters.playerCustomData.hitRate}}</div>
        </div>
      </el-col>
    </el-row>
    <el-divider>单野</el-divider>
    <el-row class="info" :gutter="20">
      <el-col :span="8">
        <div>
          <div class="info-title">PVP</div>
          <div><img class="icon-img" src="~@/assets/composite/count.png">{{$store.getters.playerCustomData.soloFightingNum}}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <div class="info-title">胜利</div>
          <div><img class="icon-img" src="~@/assets/composite/win.png">{{$store.getters.playerCustomData.soloWinningProbability}}</div>
        </div>
      </el-col>
    </el-row>
    <el-divider>自行车</el-divider>
    <el-row class="info" :gutter="20">
      <el-col :span="8">
        <div>
          <div class="info-title">PVP</div>
          <div><img class="icon-img" src="~@/assets/composite/count.png">{{$store.getters.playerCustomData.doubleFightingNum}}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <div class="info-title">胜利</div>
          <div><img class="icon-img" src="~@/assets/composite/win.png">{{$store.getters.playerCustomData.doubleWinningProbability}}</div>
        </div>
      </el-col>
    </el-row>
    <el-divider>装甲车</el-divider>
    <el-row class="info" :gutter="20">
      <el-col :span="8">
        <div>
          <div class="info-title">PVP</div>
          <div><img class="icon-img" src="~@/assets/composite/count.png">{{$store.getters.playerCustomData.threeFightingNum}}</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div>
          <div class="info-title">胜利</div>
          <div><img class="icon-img" src="~@/assets/composite/win.png">{{$store.getters.playerCustomData.threeWinningProbability}}</div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 自定义查询页面
export default {
  name: 'Custom',
  components: {
    
  },
  data() {
    return {
      nation:this.$store.getters.playerForm.nation,
      shipType:this.$store.getters.playerForm.shipType,
      shipGradeList:[this.$store.getters.playerForm.minShipGrade,this.$store.getters.playerForm.maxShipGrade]
    }
  },
  computed: {

  },
  methods:{
    findData(){
      this.$store.commit("player/SET_NATION",this.nation)
      this.$store.commit("player/SET_SHIP_TYPE",this.shipType)
      this.$store.commit("player/SET_MIN_SHIP_GRADE",this.shipGradeList[0])
      this.$store.commit("player/SET_MAX_SHIP_GRADE",this.shipGradeList[1])
      this.$store.dispatch("player/findPlayerCustomStatistics")

    }
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