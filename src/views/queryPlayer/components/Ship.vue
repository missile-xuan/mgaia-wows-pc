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
          v-model="shipGrade"
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
    <div v-for="ship in $store.getters.shipDataList" :key="ship.shipName">
      <el-divider>{{ship.shipName}}</el-divider>
      <el-row class="info" :gutter="20">
        <el-col :span="6">
          <div><img class="ship-image" :src="ship.image"></div>
        </el-col>
        <el-col :span="18">
          <div>{{ship.shipName}}  {{ship.shipGrade}}级</div>
          <div class="info-title" style="padding-top:10px">{{ship.description}}</div>
        </el-col>
      </el-row>
      
      <el-row class="info" :gutter="20">
        <el-col :span="8">
          <div>
            <div class="info-title">PVP</div>
            <div><img class="icon-img" src="~@/assets/composite/count.png">{{ship.fightingNum}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <div class="info-title">胜利</div>
            <div><img class="icon-img" src="~@/assets/composite/win.png">{{ship.winningProbability}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <div class="info-title">K/D</div>
            <div><img class="icon-img" src="~@/assets/composite/proportion.png">{{ship.killRatio}}</div>
          </div>
        </el-col>
      </el-row>
      <div style="height:10px;"></div>
      <el-row class="info" :gutter="20">
        <el-col :span="8">
          <div>
            <div class="info-title">场均经验</div>
            <div><img class="icon-img" src="~@/assets/composite/exp.png">{{ship.expexperience}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <div class="info-title">场均伤害</div>
            <div><img class="icon-img" src="~@/assets/composite/damage.png">{{ship.aveDamage}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div>
            <div class="info-title">主炮命中</div>
            <div><img class="icon-img" src="~@/assets/composite/hit.png">{{ship.hitRate}}</div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
// 船只查询页面
export default {
  name: 'Ship',
  components: {
    
  },
  data() {
    return {
      nation:this.$store.getters.playerForm.nationShip,
      shipType:this.$store.getters.playerForm.shipTypeShip,
      shipGrade:this.$store.getters.playerForm.shipGradeShip
    }
  },
  computed: {

  },
  methods:{
    findData(){
      this.$store.commit("player/SET_NATION_SHIP",this.nation)
      this.$store.commit("player/SET_SHIP_TYPE_SHIP",this.shipType)
      this.$store.commit("player/SET_SHIP_GRADE_SHIP",this.shipGrade)
      this.$store.dispatch("player/findPlayerShipStatistic")

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
.ship-image{
  height 150px
}
</style>