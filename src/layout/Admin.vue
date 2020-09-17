<template>
  <div id="admin">
    <a-layout id="components-layout-demo-top-side-2">
      <a-layout-header class="header">
        <span style="color:white"> <span  class="logo"></span> <span>{{$store.state.userinfo && $store.state.userinfo.nickname}}</span>  <img class="profile" v-lazy="$store.state.userinfo && $store.state.userinfo.img" /> <a-button type="link" @click="handleLogin">登出</a-button></span>
      </a-layout-header>
      <a-layout>
        <a-layout-sider width="200" style="background: #fff">
          <a-button type="primary" style="margin-bottom: 16px" @click="toggleCollapsed">
            <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
          </a-button>
          <a-menu
            mode="inline"
            theme="dark"
            :default-selected-keys="[selected_key]"
            :default-open-keys="[open_key]"
            :inline-collapsed="collapsed"
          >
            <a-menu-item key="/admin/home" @click="goTo('/admin')">
              <a-icon type="home" />
              <span>首页</span>
            </a-menu-item>
            <a-sub-menu key="/admin/lesson">
              <span slot="title">
                <a-icon type="user" />课程管理
              </span>
              <a-menu-item key="/admin/lesson/list" @click="goTo('/admin/lesson')">课程列表</a-menu-item>

            </a-sub-menu>
            <a-sub-menu key="/admin/teacher">
              <span slot="title">
                <a-icon type="laptop" />教师管理
              </span>
              <a-menu-item key="/admin/teacher/list" @click="goTo('/admin/teacher')">讲师列表</a-menu-item>
             
             
            </a-sub-menu>

              <a-sub-menu key="/admin/student">
              <span slot="title">
                <a-icon type="laptop" />学生管理
              </span>
              <a-menu-item key="/admin/student/list" @click="goTo('/admin/student')">学生列表</a-menu-item>
             
             
            </a-sub-menu>
          </a-menu>
        </a-layout-sider>
        <a-layout style="padding: 0 24px 24px">
          <router-view></router-view>
        </a-layout>
      </a-layout>
    </a-layout>
  </div>
</template>
<script>
import {mapActions} from 'vuex';
export default {
  data() {
    return {
      collapsed: false,
      selected_key:'1',
      open_key:'sub1'
    };
  },
  created() {
    console.log("admin layout created this.$route", this.$route);
    var arr=this.$route.path.split('/');
    console.log('arr',arr);
    this.selected_key=this.$route.path;
    this.open_key="/"+arr[1]+'/'+arr[2];
  },
  methods: {
    ...mapActions(['logout']),
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    goTo(url) {
      this.$router.push(url);
    },
    handleLogin(){
      this.logout();
      console.log('handleLogin');
      this.$router.push('/login');
    }
  },
};
</script>

<style scoped>
.logo {
  display:inline-block;
  margin-top:10px;
  height: 40px;
  width:140px;
  background: gray;
}
#components-layout-demo-top-side .logo {
  width: 120px;
  height: 31px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px 28px 16px 0;
  float: left;
}


.profile {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

</style>