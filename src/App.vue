<template>
  <div id="app">
    <v-header></v-header>
    <div class="tab">
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
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
//引入request网络请求方法
import {request} from "./network/request";
import Header from "./components/header/Header";



export default {
  name: 'App',
  components: {
    'v-header': Header,
  },
  data(){
    return{
      seller:{}
    }
  },
  created() {
    request({
    })
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
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
