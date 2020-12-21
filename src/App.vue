<template>
  <div id="app">
    <router-view/>
  </div>
</template>


<script>
export default {
  name: "App",
 
  mounted() {
    // 1000毫秒延时避免渲染时卡顿
    setTimeout(() => {
      this.$ipcRenderer.send('ev-check-for-update');
    }, 1000);
 
    this.$ipcRenderer.on("ev-message", (event, message) => {
      this.$notify({
        message,
        title: "提示",
      });
    });
 
    this.$ipcRenderer.on("ev-should-update", (event, message) => {
      event, message
      this.$confirm("检查到新版本，是否更新?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$ipcRenderer.send("ev-update-now");
      });
    });
  },
};
</script>
<style lang="stylus">
#app
  font-family Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale 
  height 100%
</style>
