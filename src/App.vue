<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px" >
      <div class="tab-item">
        <router-link to='/goods'>商品</router-link>
        </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <div class="content">
      <keep-alive>
        <router-view :seller="seller"></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
//引入request网络请求方法
import {request} from "./network/request";
import Header from "./components/header/Header";
import ShopCart from "./components/shopcart/ShopCart";
//设置获取数据成功的状态码OK
const OK = 0;

export default {
  name: 'App',
  components: {
    'v-header': Header,
    ShopCart,
  },
  data(){
    return{
      seller:{},
      default(){
        return{}
      },
      onlyContent:false,

    }
  },
  created() {
    request({
      url:'seller',
      method:'get'
    }).then(res=>{
      let data = res.data;
      if(data.errno == OK ){
        this.seller = data.data
      }

    })
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
  @import "common/stylus/mixin";
 #app
  .tab
    display:flex
    width:100%
    height:40px
    line-height: 40px
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      text-align:center
      flex:1
      & > a
        display:block
        font-size:14px
        color:rgb(77,85,93)
        &.active
          color: rgb(240, 20, 20)



</style>
