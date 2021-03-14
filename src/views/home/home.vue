<template>
    <div>
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    </div>
</template>

<script>
    import navBar from "components/common/navBar/navBar"
    import {getHome} from 'network/home'
    export default {
        components:{
            navBar
        },
        created() {
            getHome().then(res => {
                console.log(res)
            })
        }
    }
</script>

<style>
 
</style>