<template>
    <div class="tab-controll">
        <div v-for="(item,index) in titleList" :key="index" class="tab-controll-item" :class="{active:index === currentIndex}" @click="itemClick(index)">
            <span>{{item}}</span>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            titleList:{
                type:Array,
                default() {
                    return []
                }
            }
        },
        data() {
            return {
                currentIndex:0
            }
        },
        methods:{
            itemClick(index){
                this.currentIndex = index

                this.$emit('tabClick',index)
            }
        }
    }
</script>

<style>
    .tab-controll{
        display: flex;
        text-align: center;
        font-size: 15px;
        background: #fff;
    }
    .tab-controll-item{
        flex:1;
        height: 40px;
        line-height: 40px;
    }
    .active{
        color: var(--color-high-text);
        
    }
    .active span{
        border-bottom: 3px solid var(--color-tint);
        padding: 5px;
    }
</style>