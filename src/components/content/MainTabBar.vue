<template>
    <TabBar>
        <TabBarItem path='/Home' activeColor="red">
            <div slot="item-text">首页</div> 
        </TabBarItem>
        <TabBarItem path="/Category" activeColor="blue">
            <div slot="item-text">分类</div>
        </TabBarItem>
        <TabBarItem path="/Cart" activeColor="yellow">
            <div slot="item-text">购物车</div>
        </TabBarItem>
        <TabBarItem path="/Profile" activeColor="green">
            <div  slot="item-text">我的</div>
        </TabBarItem>
    </TabBar>
</template>
<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

    export default {
        components:{
            TabBar,
            TabBarItem
        }
    }
</script>