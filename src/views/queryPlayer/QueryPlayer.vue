<template>
  <div class="home">
    <div v-if="$commonUtils.isNull($store.getters.playerForm.accountId)">
      暂未选择玩家 可点击右上角搜索按钮
    </div>
    <el-tabs v-else>
      <el-tab-pane label="综合战绩" >
        <div v-if="!$store.getters.playerClanData">查询失败或隐藏战绩</div>
        <composite v-else></composite>
      </el-tab-pane>
      <el-tab-pane label="自定义" >
        <div v-if="!$store.getters.playerClanData">查询失败或隐藏战绩</div>
        <custom v-else></custom>
      </el-tab-pane>
      <el-tab-pane label="舰船" >
        <div v-if="!$store.getters.playerClanData">查询失败或隐藏战绩</div>
        <ship v-else></ship>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Composite from "./components/Composite"
import Custom from './components/Custom'
import Ship from './components/Ship'
// 玩家查询页面
export default {
  name: 'QueryPlayer',
  components: {
    Ship,
    Custom,
    Composite
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
  padding:0 20px;
}
</style>