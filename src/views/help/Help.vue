<template>
  <div class="home">
    
    <div>作者：[kko]missile_gaia</div>
    <div>反馈群：1050053532</div>
    <div>没放自动更新,可以来群里下载</div>

    <div>公告：{{noticeData}}</div>
    
  </div>
</template>

<script>
import {notice} from '@/api/wowsBattle.js'

// 帮助
export default {
  name: 'Help',
  components: {
  },
   
  data() {
    return {
      noticeData:''
    }
  },
  computed: {
    
  },
  created:function(){
    notice({}).then((response) => {
      this.noticeData=response
    })
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