<template>
    <div class="">
      <img src="goodItem.link" alt="" @load="imgLoad">
    
        <!-- 标题 -->
        <p>{{goodItem.title}}</p>
        <!-- 价格 -->
        <span>{{goodItem.price}}</span>
        <!-- 收藏 -->
        <span>{{goodItem.cfav}}</span>
    </div>
</template>

<script>

    export default {
        props:{
            goodItem:{
                type:Object,
                default() {
                    return {}
                }
            }
        },
        created() {
            this.$bus.$emit('itemImageLoads')
        },
        methods:{
            // 原生JS监听图片加载完成：img.load=() => {}
            // vue 封装了一个@load事件
            // imgLoad() {
            //     console.log('111');
            // }
            
            // 事件总线
            // imgLoad() {
            //     this.$bus.$emit('itemImageLoads')
            // }
            
        }
    }
</script>

