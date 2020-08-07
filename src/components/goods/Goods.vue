<template>
  <div>
    <div class="goods">
      <div class="goods-sort" ref="goodsSort">
        <ul>
          <li v-for="(item,index) in goods" class="sort-item" :class="{sortActive:currentIndex === index}"
              @click="selectSort(index)">
          <span class="sort-name border-1px">
             <span class="icon" v-if="item.type>0" :class="classList[item.type]"></span>
            {{item.name}}</span>
          </li>
        </ul>
      </div>
      <div class="goods-wrapper" ref="goodsWrapper">
        <ul>
          <li v-for="item in goods" class="goods-list goods-list-hook">
            <h1 class="title">{{item.name}}</h1>
            <ul>
              <li v-for="food in item.foods" class="food-item border-1px"
                  @click="selectFood(food)">
                <div class="food-img">
                  <img :src="food.image" alt="" width="60px" height="60px">
                </div>
                <div class="content">
                  <h2 class="food-name">{{food.name}}</h2>
                  <p  v-show="food.description" class="food-desc">{{food.description}}</p>
                  <div class="food-data">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="food-price">
                    <span class="now">￥{{food.price}}</span>
                    <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cart-control" >
                    <cart-control :food="food"></cart-control>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!--    引入购物车组件，需要传递的数据有：被选中的食品数组、商家的配送费、最低起送价格-->
      <shop-cart :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"
                 :select-foods="selectfoods"></shop-cart>
    </div>
    <food-detail ref="foodDetail" :food="selectedFood"></food-detail>
  </div>

</template>

<script>
  import {request} from "../../network/request";
  import BScroll from 'better-scroll';
  import ShopCart from "../shopcart/ShopCart";
  import CartControl from "../cartcontrol/CartControl";
  import FoodDetail from "../food/FoodDetail";
  const OK=0

  export default {
    name: "Goods",
    components:{
      ShopCart,CartControl,FoodDetail
    },
    data(){
      return{
        classList:['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        goods:[],
        scrollY:0,     //实事滚动的位置
        listHeight:[],       //存放各个类别商品的高度
        selectedFood:{}
      }
    },
    props:{
      seller:{
        type:Object,
        default:{}
      }
    },
    methods: {
      selectSort(index) {
        if(!Event.constructor) {     //只接受betterscroll派发的click
          return;
        }
        let goodsList = this.$refs.goodsWrapper.getElementsByClassName('goods-list-hook');  //获取商品列表的DOM对象集合
        let goods = goodsList[index];
        this.goodsWrapper.scrollToElement(goods,300)    //调用方法，滚到到指定的DOM对象
      },
      selectFood(food){               //实现点击食品，展示食品详情页
        if(!Event.constructor) {
          return;
        }
        this.selectedFood = food;         //把选中的食品的对象food赋给selectedFood，从而传给“FoodDetail”子组件
        this.$refs.foodDetail.show()        //调用FoodDetail子组件的show()方法，使得子组件能展示
      },
      _initScroll() {
        this.goodsSort = new BScroll(this.$refs.goodsSort,{        //为分类列表添加滚动条
          click:true            //点击后派发click事件
        })
        this.goodsWrapper = new BScroll(this.$refs.goodsWrapper,{         //为商品列表添加滚动条
          probeType:3,
          click:true //滚动时，探测滚动位置
        })
        this.goodsWrapper.on('scroll',(pos)=>{          //滚动时触发，获取滚动y方向位置
          this.scrollY = Math.abs(Math.round(pos.y))
        });
      },
      caculateHeight() {         //计算每个类别的高度
        let goodsList = this.$refs.goodsWrapper.getElementsByClassName('goods-list-hook');
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0;i<goodsList.length;i++){
          height += goodsList[i].clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0;i < this.listHeight.length; i++){           //遍历各个区间的高度，看当前位置高度属于哪个类别
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i+1];
          if( !height2 || (height1<=this.scrollY && height2>this.scrollY)){      //当当前位置超过最大位置，或在某个区间，则返回索引值
            return i;
          }
        }
        return 0;
      },
      selectfoods() {
        let foodsList = [];                 //用于存放被选中的食品
        this.goods.forEach((good)=>{          //遍历所有种类中的所有食品，
          good.foods.forEach((food)=>{
            if(food.count){                     //如果有数量，则加入到数组中
              foodsList.push(food)
            }
          })
        })
        return foodsList
      }
    },
    mounted() {
      request({
        url: 'goods',
        method: 'get'
      }).then(res => {
        let data = res.data;
        if (data.errno === OK) {
          this.goods = data.data
          this.$nextTick(()=>{
            this._initScroll()
            this.caculateHeight()
          })
        }
      })
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus"  scoped>
  @import "../../common/stylus/mixin.styl"
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
      .sort-item{
        padding:0 12px
        display:table
        width:80px
        height:54px
        line-height:14px
        &.sortActive{
          position: relative
          margin-top:-1px
          font-weight:700
          background-color: #fff
        }
        .icon{
          display:inline-block
          vertical-align: top
          width:12px
          height:12px
          margin-right:2px
          background-size:12px 12px
          background-repeat:no-repeat
          &.decrease {
            bg-image('decrease_3')
          }
          &.discount {
            bg-image('discount_3')
          }
          &.guarantee {
            bg-image('guarantee_3')
          }
          &.invoice {
            bg-image('invoice_3')
          }
          &.special {
            bg-image('special_3')
          }
        }
        .sort-name{
          display:table-cell
          width:56px
          vertical-align: middle
          font-size:12px
          border-1px(rgba(7,17,27,.1))
        }
      }
    }
    .goods-wrapper{
      flex:1
      .title{
        width:100%
        height:26px
        line-height: 26px
        padding-left 14px
        border-left:2px solid #d9dde1
        background-color: #f3f5f7
        font-size:12px
        color:rgb(147,153,159)
      }
      .food-item{
        display: flex
        margin:0 18px
        padding:18px 0
        border-1px(rgba(7,17,27,.1))
        &:last-child{
          none-border()
          border-bottom:none
        }
        .food-img{
          flex:0,0,60px
        }
        .content{
          flex:1
          padding:2px 0 0 10px
          .food-name{
            font-size:14px
            color:rgb(7,17,27)
            line-height:14px
          }
          .food-desc,.food-data{
            margin-top 8px
            font-size:10px
            color:rgb(147,153,159)
            line-height:12px
            .count{
              margin-right:6px
              }
          }
          .food-price{
            line-height:24px
            .now{
              font-size:14px
              color:red
              font-weight:700
            }
            .old{
              font-size:10px
              text-decoration:line-through
              color:rgb(147,153,159)
            }
          }
          .cart-control{
            position: absolute
            right:0
            bottom:12px
          }
        }
      }
    }
  }
</style>
