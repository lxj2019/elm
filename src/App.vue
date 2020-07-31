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
import Header from "./components/header/Header";

export default {
  name: 'App',
  components: {
    'v-header': Header,
  }
}
</script>

<style lang="stylus" ref="stylesheet/stylus">
 #app
  .tab
    display:flex
    width:100%
    height:40px
    line-height: 40px
    .tab-item
      text-align:center
      flex:1
      & > a
        display:block


</style>
