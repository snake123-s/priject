<template>
    <div id="hy-swiper">
        <div class="swiper"  @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
             <slot ></slot>
            <!-- <div class="slider" :class="swiperStyle">
                <a :href="item.link">
                    <img :src="item.image" alt="">
                </a>
            </div>
            <div class="slider">
                <a :href="item.link">
                    <img :src="item.image" alt="">
                </a>
            </div> -->
        </div>
        <slot name="indicator"></slot>
        <div class="indicator">
            <slot name="indicator" v-if="showIndicator && slideCount > 1">
                <div v-for="item in slideCount" class="indi-item" :class="{active:index === currentIndex-1}" :key="item"> 
                </div>
            </slot>
        </div>
    </div>

</template>

<script>
    export default {
        props:{
            interval:{
                type:Number,
                default:3000
            },
            animDruation:{
                type:Number,
                default:30
            },
            moveRation:{
                type:Number,
                default:0.25
            },
            showIndicator:{
                type:Boolean,
                default:true
            },
        },
        data() {
            return {
                slideCount:0, // 元素个数
                totalWidth:0, // swiper的宽度
                swiperStyle:{}, // swiper样式
                currentIndex:1, // 当前的index
                scrolling:false // 是否正在滚动
            }
        },
        mounted() {
            // 操作DOM,在前后添加Slider
            setTimeout(() => {
                this.hadnleDom()

                // 开启定时器
                this.startTimer()
            },2000)
        },
        methods:{
            // 定时器
            startTimer() {
                // ?
                this.playTimer = window.setInterval(() => {
                    this.currentIndex++;
                    this.scrollContent(-this.currentIndex * this.totalWidth);
                },this.interval)
               
            },
            stopTimer() {
                window.clearInterval(this.playTimer)
            },
            
            // 滚动到正确位置
            scrollContent(currentPosition) {
                // 0 设置正在滚动
                this.scrolling = true

                // 1.开始滚动
                this.swiperStyle.transition = 'transform ' + this.animDruation + 'ms'
                this.setTransform(currentPosition);

                // 2.判断滚动到的位置
                this.checkPosition();

                // 3.滚动完成
                this.scrolling = false   
                // swiperStyle{
                //     transition:transform 30ms
                //     transform:translate3d(-200,0,0)
                //     display: flex
                //                 }  
            },
             // 校验正确位置
            checkPosition() {
                window.setTimeout(() => {
                    // 1.校验正确位置
                    this.swiperStyle.transition = '0ms';
                    if(this.currentIndex >= this.slideCount +1) {
                        this.currentIndex = 1
                        this.setTransform(-this.currentIndex * this.totalWidth);
                    } else if(this.currentIndex <= 0) {
                        this.currentIndex = this.slideCount;
                        this.setTransform(-this.currentIndex * this.totalWidth);
                    }
                    // 2.结束移动后的回调
                    this.$emit('transitionEnd',this.currentIndex-1);
                },this.animDruation)
            },

            // 设置滚动的位置
            setTransform(position) {
                this.swiperStyle.transform = 'translate3d(${position}px,0,0)';
            },
            
            // 操作DOM,在DOM后添加Slider
            hadnleDom() {
                // 1.获取要操作的元素
                let swiperEl = document.querySelector('.swiper')
                let slidesEls = swiperEl.getElementsByClassName('slide')

                // 2.保存个数
                this.slideCount = slidesEls.length

                // 3.如果个数大于1个，那么就在前后分别添加一个slider
                if(this.slideCount > 1) {
                    
                    this.totalWidth = swiperEl.offsetWidth
                    // this.swiperStyle = swiperEl.style;
                    slidesEls[0].style.width = this.totalWidth
                    slidesEls[1].style.width = this.totalWidth
                    slidesEls[2].style.width = this.totalWidth
                    slidesEls[3].style.width = this.totalWidth
                    
                    
                }
                // 4.让swiper元素，显示第一个(目前是显示前面添加的最后一个元素)
                this.setTransform(-this.totalWidth);
            
            },
            // 拖动事件处理
            touchStart(e) {
                // 1.如果正在滚动，不可以拖动
                if(this.scrolling) return
                // 2.停止定时器
                this.stopTimer();

                // 3.保存开始滚动的位置
                this.startX = e.touches[0].pagex;

            },

            touchMove(e) {
                // 计算用户拖动的距离
                this.currentx = e.touches[0].pagex
                this.distance = this.currentx - this.startX
                let currentPosition = -this.currentIndex * this.totalWidth
                let moveDistance = this.distance + currentPosition;
                
                // 设置当前位置
                this.setTransform(moveDistance)
            },
            touchEnd(e) {

                // 获取移动的距离
                let currentMove = Math.abs(this.distance);

                // 判断最终的距离
                if(this.distance === 0){
                    return 
                } else if(this.distance >0 && currentMove > this.totalWidth * this.moveRation){
                    this.currentIndex-- // 向右移动0.5
                } else if(this.distance <0 && currentMove > this.totalWidth * this.moveRation){
                    this.currentIndex++ // 向左移动0.5
                }

                // 3.移动到正确位置
                this.scrollContent(-this.currentIndex * this.totalWidth);

                // 4.移动完成后重新开启定时器
                this.startTimer();
            },

            // 控制上一个，下一个
            previous() {
                this.changeItem(-1)
            },
            next() {
                this.changeItem(1)
            },
            changeItem(num) {
                // 移除定时器
                this.stopTimer()

                // 修改index和位置
                this.currentIndex += num
                this.scrollContent(-this.currentIndex * this.totalWidth);
                // 添加定时器
                this.startTimer();
            }
           
        }
    }
</script>

<style scoped>
    #hy-swiper {
        overflow: hidden;
        position: relative;
    }
    .swiper{
        display: flex
    }
    .indicator{
        display: flex;
        justify-content: center;
        position: absolute;
        width: 100%;
        bottom: 8px;
    }
    .indi-item{
        box-sizing: border-box;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background-color: #fff;
        line-height: 8px;
        text-align: center;
        font-size: 12px;
        margin: 0 5px;
    
    }
    .indi-item .active {
        background-color: rgba(212, 62, 46, 1.0);
    }
</style>