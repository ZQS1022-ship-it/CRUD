import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//引入antd vue
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
Vue.use(Antd);

// 引入自定义axios
import axios from './http';
// 将自定义axios对象挂载到vue原型链方法上，可以在组件中以this.$http的方式调用
Vue.prototype.$http=axios;

// 图片懒加载引入
import VueLazyLoad from 'vue-lazyload';  
Vue.use(VueLazyLoad);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
