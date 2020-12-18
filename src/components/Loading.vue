<template>
  <div class='loader-center'>
    <div class='chars'>
      <span class='char brace'>{</span>
      <span class='dots'>
        <span class='char dot _dot-1'>.</span>
        <span class='char dot _dot-2'>.</span>
        <span class='char dot _dot-3'>.</span>
      </span>
      <span class='char brace'>}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Loading',
  components: {
  },
  data() {
    return {
    }
  },
  created:function(){

  },
  // 销毁
  beforeDestroy(){
  },
  methods:{
  }
}
</script>

<style lang="stylus" scoped>

.loader-center {
  width:300px;
  height:70px;
  line-height:70px;
  
  margin:0 auto;
  text-align:center;
  font-size:50px;
  letter-spacing:-4px;
  
  color #8d9bad
  
}
.loader-center .chars .dots .char {
  display:inline-block;
}

/* animation starts here */
.dots .dot {
  position:relative;
  top:0; left:0; 
}

.dot._dot-1 {
  animation:dot_1 1s ease-in-out infinite;
  animation-fill-mode: backwards;
  animation-direction: alternate;
}

.dot._dot-2 {
  animation:dot_2 1s ease-in-out infinite;
  animation-fill-mode: backwards;
  animation-direction: alternate;
  animation-delay:1s;
}

.dot._dot-3 {
  animation:dot_3 1s ease-in-out infinite;
  animation-fill-mode: backwards;
  animation-direction: alternate;
  animation-delay:0.5s;
}


@keyframes dot_1 {
  0% {
    top:-20px;
    left:0;
  }
  
  50% {
    top:10px;
    left:20px;
  }
  
  100% {
    top:0px;
    left:80px;
  }
}


@keyframes dot_2 {
  0% {
    top:0;
    left:0;
  }
  
  50% {
    top:-30px;
    left:20px;
  }
  
  100% {
    top:0px;
    left:40px;
  }
}


@keyframes dot_3 {
  0% {
    top:0;
    left:0;
  }
  
  50% {
    top:-30px;
    left:-40px;
  }
  
  100% {
    top:0px;
    left:-80px;
  }
}
</style>