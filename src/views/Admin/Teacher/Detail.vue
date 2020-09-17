<template>
    <div>

 <a-breadcrumb style="margin: 16px 0">
       <a-breadcrumb-item><router-link to="/admin">首页</router-link></a-breadcrumb-item>
        <a-breadcrumb-item><router-link to="/admin/teacher">教师管理</router-link></a-breadcrumb-item>
      <a-breadcrumb-item>教师详情</a-breadcrumb-item>
    </a-breadcrumb>

    <a-layout-content v-if="teacher"
      :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
    >教师详情
    <p>姓名：{{teacher.name}}</p>
      <p>头像：<img v-lazy="teacher.image" /></p>
      <p>详情：{{teacher.desc}}</P>
    </a-layout-content>

    </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
export default {
    data(){
        return{

        }
    },
    computed:{
     ...mapState(['teacher'])
    },
    methods:{
        ...mapActions(['getTeacher'])
    },
    created(){
        this.getTeacher(this.$route.params.id)
    }
}
</script>