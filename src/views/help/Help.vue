<template>
  <div class="home">
    
    <div>作者：[kko]missile_gaia</div>
    <div>反馈群：1050053532</div>
    <div>0.1.9</div>
    <div>==================</div>
    <div>更新：</div>
    <div>优化了排序,现在按照舰种等级排序了</div>
    <div>==================</div>
    <div>有意见建议欢迎加群提</div>
    <div>合理建议包您满意</div>
    <div>求推广！ 用爱发电 涨日活是我唯一动力！</div>
    <div>==================</div>
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