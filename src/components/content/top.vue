<template>
    <div>
        <button  class="button" @click="btn">点击回到顶部</button>
    </div>
</template>
<script>
    export default {
        created() {
            this.$bus.$emit('itemImageLoad')
        },
        methods:{
            btn() {
                this.$emit('aa')
            }
        }
    }
</script>

<style scoped>
    .button{
        width: 100px;
        height: 100px;
        position: fixed;
        right: 0;
        bottom: 60px;
        border-radius: 10px;
     

    }

</style>