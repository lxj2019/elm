<template>
  <div class="cart-control">
    <transition  name="scroll"><div class="cart-decrease" v-show="food.count>0"
    @click="decreaseCount()"></div></transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-increase" @click="increaseCount()"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  export default {
    name: "CartControl",
    props:{
      food:{
        type:Object
      }
    },
    methods:{
      increaseCount(){
        if(!Event.constructor){
          return
        }
        if(this.food.count){            //如果count不存在，则添加count属性
          this.food.count++
        }else {
          Vue.set(this.food,'count',1)        //通过Vue添加属性，属性才具有响应式
        }
      },
      decreaseCount(){
        if(!Event.constructor){
          return;
        }
        if(this.food.count){
          this.food.count--;
        }
      }
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus"  scoped>
  .cart-control{
      display:flex
    .cart-decrease,
    .cart-increase{
      display:inline-block
      padding:6px
      line-height 24px
      font-size:24px
      font-family:icomoon
      color: rgb(0,160,220)
      /*transition: all 5s linear;*/
      &.scroll-enter-active,&.scroll-leave-active {
        transition: all .4s linear;
      }
      &.scroll-enter,&.scroll-leave-to{
        opacity: 0
        transform:translate3D(48px,0,0) rotate(180deg)
      }
    }
    .cart-count{
      display:inline-block
      width:24px
      padding:6px
      text-align: center
      vertical-align: center
      line-height: 24px
      font-size:12px
      color:rgb(147,153,159)
    }
  }
</style>
