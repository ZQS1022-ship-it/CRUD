<template>
    <div>
        <span>{{userinfo.nickname}} 您来了</span>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    computed:{
         // 把vuex中的state属性映射到组件compouted属性上 可以直接通过this.userinfo调用
        ...mapState(['userinfo'])
    }
}
</script>