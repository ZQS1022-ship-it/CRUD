import Vue from 'vue'
import Vuex from 'vuex'
import $http from '../http';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading:false, // 是否处于加载中
    token:window.localStorage.getItem('token')?window.localStorage.getItem('token'):'',  // token
    userinfo:localStorage.getItem('userinfo')?JSON.parse(localStorage.getItem('userinfo')):{} , // 用户基本信息
    list:[], // 列表数据
    teacher_list:[],  //教师列表
    teacher:{},  // 教师详情
  },
  mutations: {
    // 设置loading状态
    SET_LOADING(state,data){
       state.loading=data;
    },

    // 保存list
    SET_LIST(state,data){
      state.list=data;
    },

    // 保存教师列表
    SET_TEACHER_LIST(state,data){
      console.log('SET_TEACHER_LIST data',data);
      state.teacher_list=data;
      console.log('state.teacher_list',state.teacher_list);
    },

    // 存储教师详情
    SET_TEACHER(state,data){
      console.log('set teacher data',data)
      state.teacher=data;
      console.log('state.teacher',state.teacher);
    },


    // 保存token
    SET_TOKEN(state,data){
      state.token=data;
      window.localStorage.setItem('token',data);
    },

    // 保存用户信息
    SET_USERINFO(state,data){
      state.userinfo=data;
      window.localStorage.setItem('userinfo',JSON.stringify(data))
    }


  },
  actions: {

    // 获取数据列表
    getList(context){
      $http.get('/api/list').then((res)=>{
        context.commit('SET_LIST',res.data); // 设置列表值
      })
      
    },

    // 获取教师列表
    getTeacherList(context){
      $http.get('/api/teachers').then((res)=>{
         console.log('api/teacher res ',res);
         context.commit('SET_TEACHER_LIST',res.data)
      })
    },

    // 获取教师详情
    getTeacher(context,id){
      $http.get('/api/teacher?id='+id).then((res)=>{
         console.log('api/teacher res',res);
         context.commit('SET_TEACHER',res.data);
      })
   
    },

    updateTeacher(context,data){
      $http.post('/api/teacher',data).then((res)=>{
        console.log('add teacher res',res);
        context.commit("SET_TEACHER_LIST",res.data)
      
      })
    },


   



    // 删除教师
    deleteTeacher(context,id){
      console.log('delete teacher begin',id);
       $http.post('/api/teacher',{id}).then((res)=>{    
         console.log('delete teacher res',res.data) ;
         context.commit("SET_TEACHER_LIST",res.data);
         alert(res.message);
       }).catch((err)=>{
         console.log('delete teacher err',err);
       })
    },

    login(context,data){
     return $http.post('/api/login',data).then((res)=>{
        // 根据code判断用户登录状态，如果code为0，说明登录成功
        if(res.code===0){
             context.commit("SET_TOKEN",res.token)  //把获取到的token值通过mutations方法赋给store里的state 属性 token
             context.commit("SET_USERINFO",res.userinfo) // 把获取到的用户信息通过mutations方法赋值给仓库里的 state属性 userinfo
             return  Promise.resolve('登录成功');
      }else{
          //登录失败 ，显示后端返回的错误提示
          return Promise.reject(res.message);
        
      }
      })
    },
    logout(context){
      context.commit("SET_TOKEN",'');
      context.commit("SET_USERINFO",{}) 
     
    }
  },
  modules: {
  }
})
