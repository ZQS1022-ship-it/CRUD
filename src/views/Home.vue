<template>
  <div class="home">
     <!-- loading状态被拦截器统一处理过了 ，所以这里可以直接表达真实loading状态-->
     <!-- 如果loading的值为true 就显示数据加载中-->
     <div v-show="loading">
        <div v-for="item in 10" :key="item">
           <a-skeleton :avatar="{size:100,shape:square}" :paragraph="{ rows: 4 }" />
        </div>
     </div>
     <!-- 如果loading的值为false 就渲染数据-->
     <ul v-show="!loading">

       <!--点击进入详情页-->
       <li v-for="item in list" :key="item.id" @click="goTo('/detail/'+item.id)">
         name:{{item.name}}<br>

          <!--图片懒加载-->
         <img v-lazy="item.img" />
         
         <!--显示是否有活动-->
         <div v-if="item.hasActivities">有活动</div>
         <div v-if="!item.hasActivities">没活动</div>
       </li>
       </ul>
  </div>
</template>

<script>
import {mapActions,mapState} from 'vuex';


export default {
  name: 'Home',
  components: {
    
  },
  created(){
    this.getList()
  },
  computed:{
    // 将vuex里的state属性 loading 和list 映射到本组的computed属性上
    // 视图区域可以直接调用loading和list
    ...mapState(['loading','list'])
  },
  methods:{
    // 把vuex里的actions方法映射到本组件的methods属性上
    ...mapActions(['getList']),

    goTo(url){
      this.$router.push(url);
    }
  }

}
</script>
