<template>
    <div class="tab-bar-item">
        <div :style="activeStyle" @click='btn'>
            <slot name="item-text"></slot>
        </div>
    </div>
    
</template>
<script>
    export default {
        props:{
            path:String,
            activeColor:{
                type:String,
                default:'red'
            }
        },
        data() {
            return {
                // isActive:true
            }
        },
        methods:{
            btn() {
                this.$router.push(this.path)
            }
        }, 
        computed:{
            isActive() {
                return this.$route.path.indexOf(this.path) !== -1
            },
            activeStyle() {
                return this.isActive ? {color:this.activeColor} : {}
            }
        }
    }
</script>