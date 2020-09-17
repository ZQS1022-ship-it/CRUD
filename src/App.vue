<template>
  <div id="appcompontent">
  
    <!--路由出口 增加动画效果 用户切换页面时 能看到动画 -->
   
    <router-view/>
   
   
  </div>
</template>

<style lang="scss">
//定义动画css
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
<script>
import {mapState} from 'vuex'
export default {
    computed:{
      // 把vuex中的state属性映射到组件compouted属性上 可以直接通过this.userinfo调用
        ...mapState(['userinfo'])
    }
}
</script>