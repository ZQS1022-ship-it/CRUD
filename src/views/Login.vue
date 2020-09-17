<template>
    <div>Login

        <input v-model="username">
        <input v-model="password">
        <button @click="handleLogin">登录</button>
    </div>
</template>
<script>
import {mapMutations,mapActions} from "vuex";
export default {
    data(){
        return {
            username:'',
            password:''
        }
    },
    methods:{
        ...mapMutations(["SET_TOKEN","SET_USERINFO"]),
        ...mapActions(["login"]),

        handleLogin(){
            this.login({username:this.username,password:this.password}).then((res)=>{
                alert(res);
                this.$router.push('/admin');

            }).catch((err)=>{
                alert(err)
            })
        }
      
    }
}
</script>