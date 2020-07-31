import VueRouter from 'vue-router'
import Vue from 'vue'

//组件
import Goods from '../components/goods/Goods'
import Ratings from "../components/ratings/Ratings";
import Seller from "../components/seller/Seller";
Vue.use(VueRouter)

const routes=[
  {
    path: '',
    redirect:'/goods'
  },
  {
    path:'/goods',
    component:Goods
  },
  {
    path:'/ratings',
    component:Ratings
  },
  {
    path:'/seller',
    component:Seller
  }

]
const router = new VueRouter({
  routes,
  mode:'history',
  linkActiveClass:"active"
});

export default router

