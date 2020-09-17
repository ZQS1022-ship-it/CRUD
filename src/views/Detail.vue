<template>
    <div>
        <div>详情页</div>
        <div v-if="item">
            name:{{item.name}}<br>
            <!--图片懒加载-->
            <img v-lazy="item.img" />

        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    data(){
        return{
           item:{}
        }
    },
    computed:{
        //映射vuex中的 list状态
        ...mapState(['list'])
    },
    created(){
        //根据路由参数遍历list 返回第一个匹配项给itme 
        // 这里id比较时强制转换为字符串，避免因为数据的类型不同无法匹配到数据
       this.item=this.list.find((item)=>{
           return item.id+''===this.$route.params.id+''
       }) 
    }
}
</script>