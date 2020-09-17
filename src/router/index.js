import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  {
    path: '/my',
    name: 'My',
    component: () => import(/* webpackChunkName: "my" */ '../views/My.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {

    //动态路由的定义
    path: '/detail/:id',
    name: 'Detail',
    component: () => import(/* webpackChunkName: "detail" */ '../views/Detail.vue')
  },

  {
    path: '/admin',
    name: 'Admin',
    meta:{needLogin:true},
    redirect:"/admin/home",
    component: () => import(/* webpackChunkName: "admin" */ '../layout/Admin.vue'),
    children:[
      {
        path: '/admin/home',
        name: 'AdminHome',
        meta:{needLogin:true},
        component: () => import(/* webpackChunkName: "adminhome" */ '../views/Admin/Home.vue')
      },

      {
        path: '/admin/teacher',
        redirect:"/admin/teacher/list"
      },

      {
        path: '/admin/teacher/list',
        name: 'Teacher',
        meta:{needLogin:true},
        component: () => import(/* webpackChunkName: "teacher" */ '../views/Admin/Teacher/List.vue')
      },

      {
        path: '/admin/teacher/detail/:id',
        name: 'TeacherDetail',
        meta:{needLogin:true},
        component: () => import(/* webpackChunkName: "teacherdetail" */ '../views/Admin/Teacher/Detail.vue')
      },

      {
        path: '/admin/student',
        redirect:"/admin/student/list"
      },


      {
        path: '/admin/student/list',
        name: 'Student',
        meta:{needLogin:true},
        component: () => import(/* webpackChunkName: "student" */ '../views/Admin/Student/List.vue')
      },

      {
        path: '/admin/lesson',
        redirect:"/admin/lesson/list"
      },


      {
        path: '/admin/lesson/list',
        name: 'Lesson',
        meta:{needLogin:true},
        component: () => import(/* webpackChunkName: "lesson" */ '../views/Admin/Lesson/List.vue')
      },
    ]
  },

 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next)=>{
  console.log('to',to);
  console.log('from',from);
  console.log('next',next);
  if(to.path===from.path){
    return;
  }


  if(to.meta && to.meta.needLogin && !store.state.token ){
    next({path:'/login'});
  }else{
  
    next();
  }
})

export default router
