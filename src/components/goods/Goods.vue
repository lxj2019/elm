<template>
  <div class="goods">
    <div class="goods-sort">
      <ul>
        <li v-for="item in goods" class="sort-item" >
          <span class="sort-name">
             <span class="icon" v-if="item.type>0" :class="classList"></span>
            {{item.name}}</span>
        </li>
      </ul>
    </div>
    <div class="goods-list">
    </div>
  </div>
</template>

<script>
  import {request} from "../../network/request";

  export default {
    name: "Goods",
    data(){
      return{
        goods:[]
      }

    },
    props:{
      seller:{
        type:Object,
        default:{}
      }
    },
    created() {
      request({
        url: 'goods',
        method: 'get'
      }).then(res => {
        let data = res.data;
        if (data.errno == OK) {
          this.goods = data.data
        }
      })
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus"  scoped>
  .goods{
    display:flex
    position:absolute
    top:174px         //头部高度134 + tab高度40px
    bottom:46px
    width:100%
    overflow:hidden
    .goods-sort{
      flex:0 0 80px
      width:80
      background-color: #f3f5f7
    }
    .goods-list{

    }
  }
</style>
