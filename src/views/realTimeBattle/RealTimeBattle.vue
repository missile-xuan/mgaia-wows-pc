<template>
  <div class="home">
    <div v-if="$commonUtils.isNull($store.getters.realBattlePath)" >
      <div>实时战斗无法使用,请先配置wows录像文件路径</div>
      <el-button @click="setRealBattlePath">设置路径</el-button>
    </div>
  </div>
</template>

<script>
// 实时战斗页面
export default {
  name: 'RealTimeBattle',
  components: {
  },
  data() {
    return {
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
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>