<template>
    <div class="wrapper" ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'

    export default {
        props:{
            probeType:{
                type:Number,
                default:0
            },
            pullUpLoad:{
                type:Boolean,
                default:true
            }

        },
        data() {
            return {
                scroll:null
            }
        },  
        methods:{
            finish() {
                this.scroll.finishPullUp()
            },
            refresh() {
                this.scroll.refresh()
            },
            getScrollY() {
                return  this.scroll? this.scroll.y : 0
            }
        },
        mounted() {
            this.scroll = new BScroll(this.$refs.wrapper,{
                click:true,
                probeType:this.probeType,
                pullUpLoad:this.pullUpLoad
            })

            // 监听滚动
            this.scroll.on('scroll',(position) => {
                this.$emit('scrollss',position)
            })

            // 监听上拉加载更多
            this.scroll.on('pullingup',() => {
                this.$emit('pullingup')
                
            })
        }
    } 
</script>