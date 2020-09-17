// axios二次封装
import axios from 'axios';
import store from '../store'; // 引入vuex仓库


// 请求拦截器
axios.interceptors.request.use((config)=>{

    // 设置请求头部信息 Authorization属性的值 ，token来自vuex
    config.headers['Authoriazation']='Bearer '+store.state.token; 

    // 统一处理loading状态 ，设置loading为加载中的状态
    store.commit('SET_LOADING',true); 
    return config;
});


// 响应拦截器
axios.interceptors.response.use((config)=>{

   // 统一处理loading状态 ，设置loading为完成加载的状态
  store.commit('SET_LOADING',false);

  switch(config.status){
      case 200:
          return config.data;
      default:
          alert("网络异常");

  }
})

export default axios;