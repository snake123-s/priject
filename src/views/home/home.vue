<template>
    <div id="home">
        <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
        <tabControl  :titleList="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isFixed"/>
        <scroll class="contents" ref="scroll" @scroll="scrollss" :probeType="3" :pull-up-load="true" @pullingup="loadMore">
            <swiper class="content">
                <swiper-item v-for="(item,index) in banners" :key="index">
                    <a :href="item.link">
                        <img :src="item.image" alt="" @load="imgLoad">
                    </a>
                </swiper-item>
            </swiper>
            <home-view :recommends = "recommends"></home-view>
            <FeatureView/>
            <tabControl  :titleList="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"/>
            <goodList :good="good[currentType].list"></goodList>
        </scroll>
        <top @click.native="btn" v-show='isShowBackTop'   class="button"  ></top>
        <ul>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
            <li>liebiao</li>
        </ul>


    </div>
</template>

<script>
    import navBar from "components/common/navBar/navBar"
    import {Swiper,SwiperItem} from 'components/common/swiper'
    import homeView from './childComps/homeView'
    import FeatureView from './childComps/FeatureView'
    import tabControl from 'components/content/tabControl'
    import goodList from 'components/content/goodList'
    import scroll from 'components/common/scroll/scroll'
    import top from 'components/content/top'

    import {getHome,getHomeData} from 'network/home'
    import {debounce} from 'common/utils'
    export default {
        components:{
            navBar,
            Swiper,
            SwiperItem,
            homeView,
            FeatureView,
            tabControl,
            goodList,
            scroll,
            top
        },
        data() {
            return {
                banners:[],
                recommends:[],
                currentType:'pop',
                isShowBackTop:true,
                good:{
                    'pop':{page:0,list:[]},
                    'new':{page:0,list:[]},
                    'sell':{page:0,list:[]},
                },
                tabOffsetTop:0,
                isLoad:false,
                isFixed:false,
                saveY:0
            }
        },
        methods:{
            imgLoad() {
                if (!this.isLoad) {
                    this.isLoad = true
                    console.log(this.$refs.tabControl2.$el.offsetTop);
                    // 获取tabContro的offsetTop
                    // 所有的组件都有一个属性$el:用于获取组件中的元素
            
                    this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
                    this.$refs.scroll.refresh()
                }
               
            },
            
           getHome() {
                getHome().then(res => {
                    console.log(res);
                    this.banners = res.data.data.banner.list
                    this.recommends = res.data.data.recommend.list
                })
           },
           getHomeData(type) {
                const page = this.good[type].page + 1
                getHomeData(type,page).then(res => {
                    console.log(res)
                    this.good[type].list.push(...res.data.popList)
                    this.good[type].page +=1
                    this.$refs.scroll.finish()
                })
           },
           // 回到顶部
           btn() {
               console.log(this.$refs.scroll.scroll)
            this.$refs.scroll.scroll.scrollTo(0,0)
           },
           // 上拉加载更多
           loadMore() {
            this.getHomeData(this.currentType)
            
            
           },
           // 监听位置
           scrollss(position) {
            this.isShowBackTop = (-position.y) > 1000
            if((-position.y) > this.tabOffsetTop) {
                this.isFixed = true
            } else {
                this.isFixed = false
            }
           },

           tabClick(index){
               switch (index) {
                    case 0:
                        this.currentType = 'pop'
                        break
                    case 1:
                        this.currentType = 'new'
                        break
                    case 2:
                        this.currentType = 'sell'
                        break
               }
               this.$refs.tabControl1.currentIndex = index
               this.$refs.tabControl2.currentIndex = index
           }
        },
        created() {
           
            this.getHome()
            // this.getHomeData('pop')
            // this.getHomeData('new')
            // this.getHomeData('sell')
        },
        mounted() {
            // 图片加载的事件监听
            const refresh = debounce(this.$refs.scroll.refresh,500)
            this.$bus.$on('itemImageLoads',() => {
                refresh()
            })
            // this.$bus.$on('itemImageLoads',() => {
            //     console.log(111 )
            //     this.$refs.scroll.refresh()
            // })
            console.log(111);
            this.$bus.$on('itemImageLoad',() => {
               
                console.log(223)
            })
        },
        activated() {
            this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
            this.$refs.scroll.refresh()
        },
        deactivated() {
            this.saveY = this.$refs.scroll.getScrollY()
            console.log(this.saveY);
        }
    }
</script>

<style scoped>
 
 .contents{
    height: 300px;
    overflow: hidden;
 }
 .tab-control{
     position: relative;
     z-index: 9;
 }
 .button{
     background-color: green;
     height: 400px;
     width: 400px;
 }
</style>