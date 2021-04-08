import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const cart = () => import('@/views/cart/cart')
const category = () => import('@/views/category/category')
const home = () => import('@/views/home/home')
const profile = () => import('@/views/profile/profile')

const routes = [
    {
        path:'',
        component:home,
        redirect:'/home'
    },
    {
        path:'/cart',
        component:cart,
        name:'cart'
    },
    {
        path:'/category',
        component:category,
        name:'category'
    },
    {
        path:'/home',
        component:home,
        name:'home'
    },
    {
        path:'/profile',
        component:profile,
        name:'profile'
    }
]
const router = new VueRouter({
    routes:routes,
    mode:'history'
})

export default router