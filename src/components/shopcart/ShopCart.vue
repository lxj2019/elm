<template>
<!--  购物车组件：包括底部购物车、点击折叠购物车列表、背景-->
  <div>
    <div class="shopcart">
      <div class="content" @click="toggleList()">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo-box" :class="{light:totalCount>0}">
              <span class="logo"></span>
              <div v-show="totalCount" class="num">{{totalCount}}</div>
            </div>
          </div>
          <div class="price">￥{{totalPrice}}</div>
          <div class="extra">另需配收费{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
<!--          当大于起送价格时，可以结算，用stop修饰符阻止事件冒泡，使得发生折叠-->
          <div class="pay" :class="{enough:isEnough}" @click.stop="pay()">
            {{payDesc}}
          </div>
        </div>
      </div>
      <!--      购物车列表模块 start -->
      <transition name="drop">
        <div class="shopcart-list" v-show="listShow">
          <div class="list-head">
            <h1 class="title">购物车</h1>
            <span class="clearCart" @click="clearCart()">清空</span>
          </div>
          <div class="list-content" ref="listContent">
            <ul>
              <li v-for="food in selectFoods" class="foodItem">
                <span class='food-name'>{{food.name}}</span>
                <span class="food-price">￥{{food.count*food.price}}</span>
                <div class="cart-control">
                  <cart-control :food="food"></cart-control>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>

    </div>
    <transition name="fade">
      <div class="shopcart-blur" v-show="listShow"
      @click="hideCartList()"></div>
    </transition>
  </div>
</template>

<script>
  import CartControl from "../cartcontrol/CartControl";
  import BScroll from "better-scroll"
  export default {
    name: "ShopCart",
    components:{
      CartControl,
    },
    props:{
      selectFoods: {           //选择商品的数组
        type:Array,
        default() {
          return[
              {price:5,count:5}
            ]
          }
        },
      deliveryPrice: {
        type:Number,
        default:0
      },
      minPrice: {
        type:Number,
        default:5
      }
    },
    data() {
      return{
        isEnough :false,         //判断是否足够起送
        fold:true                 //购物车列表是否折叠
      }
    },
    methods:{
      toggleList(){                   //如果购物车没有商品，则返回
        if(!this.totalCount) {         //有则切换折叠状态
          return;
        }
        this.fold = !this.fold;
      },
      hideCartList(){                 //隐藏购物车列表，进入折叠状态
        this.fold = true
      },
      clearCart(){
        this.selectFoods.forEach((food)=>{
          food.count=0;
        })
      },
      pay(){
        if(this.totalPrice<this.minPrice) {
          return
        }
          window.alert(`支付${this.totalPrice}元`)
      }


    },
    computed:{
    totalPrice() {           //计算商品的总价格
      let total=0;
      this.selectFoods.forEach((food)=> {
        total+=food.price * food.count
      });
      return total;
    },
    totalCount() {         //计算商品数量的总和
      let total = 0;
      this.selectFoods.forEach((food)=> {
        total+=food.count
      });
      return total;
    },
      payDesc() {                    //计算是总价否大于起送价格
        if(this.totalPrice<this.minPrice) {              //小于则显示还差多少
          this.isEnough =false                          //起送标记为false
          let price = this.minPrice-this.totalPrice
          return `还差￥${price}元起送`
        }else{
          this.isEnough = true
          return "去结算"                  //大于则显示去结算
        }
      },
      listShow() {                           //控制购物车列表是否展示
        if (!this.totalCount) {               //如果未选择商品，不展示
          this.fold = true
          return false
        }
        let show = !this.fold               //已选中商品，根据是否折叠来展示
        if (show) {
          this.$nextTick(()=>{                  //为购物车增加滚动条
            if (!this.cartScroll) {                //先判断对象是否存在，不存在则new一个
              this.cartScroll = new BScroll(this.$refs.listContent,{
                click:true
              });
            }else {
              this.cartScroll.refresh();          //存在则调用refresh接口，不用重新创建
            }
          })
        }
        return show;
      }
    }
  }
</script>


<style lang="stylus" ref="stylesheet/stylus"  scoped>
  @import "../../common/stylus/mixin.styl"
  .shopcart {
    position: fixed
    bottom:0
    left:0
    z-index:50
    width:100%
    height:48px
    background: #141d27
    .content{
      display: flex
      position:relative
      height:100%
      color:rgba(255,255,255,.4)
      .content-left{
        flex:1
        .logo-wrapper {
          display: inline-block
          position: relative
          top: -10px
          margin: 0 12px 2px
          padding: 6px
          width: 56px
          height: 56px
          background-color: #141d27
          border-radius: 50%
          .logo-box {
            width: 100%
            height: 100%
            background-color: #2b343c
            border-radius: 50%
            text-align center
            &.light{
              background-color: rgb(0,160,220)
              color:#fff
            }
            .logo {
              font-family: icomoon
              font-size: 24px
              line-height: 44px
            }
            .num{
              position: absolute
              top:0
              right:0
              width:24px
              height:16px
              line-height: 16px
              text-align: center
              border-radius:16px
              background-color: rgb(240,20,20)
              box-shadow:0 4px 8px 0 rgba(0,0,0,.4)
              font-size:9px
              font-weight:700
              color:#ffffff
            }
          }
        }
        .price{
          display:inline-block
          margin: 12px 0 12px;
          padding-right:12px
          vertical-align: top
          line-height: 24px
          font-size:16px
          font-weight:700
          border-right:1px solid rgba(255,255,255,.2)
          }
        .extra{
          display inline-block
          vertical-align top
          margin:12px 0 12px 12px
          line-height:24px
          font-size:12px
          }
        }
      .content-right{
        flex:0,0,105px
        width:105px
        background-color: #2b333b
        .pay{
          height:48px
          text-align:center
          line-height:48px
          font-size:12px
          &.enough{
            background-color: #00b43c
            color:#fff
          }
        }
      }
  }
    .shopcart-list{
      position:absolute
      left:0
      top:0
      z-index:-1
      transform:translate3d(0,-100%,0)
      //transform:translateY(-100%)
      width:100%
      &.drop-enter-active,&.drop-leave-active{
        transition: all .4s linear;
      }
      &.drop-enter,&.drop-leave-to{
        opacity: 0
        transform:translate3d(0,0,0)
      }
      .list-head{
        height:40px
        padding:0 18px
        line-height: 40px
        background-color: #f3f5f7
        border-bottom: 1px solid rgba(7,17,27, .1);
        .title{
          float:left
          font-size:14px
          color:rgb(7,17,27)
          font-weight:200
        }
        .clearCart{
          float:right
          font-size:12px
          color:rgb(0,160,220)
        }
      }
      .list-content{
        position:relative
        max-height: 217px;
        padding:0 18px
        overflow:hidden
        background-color: #fff
        .foodItem{
          position:relative
          width:100%
          height:48px
          padding:12px
          border-1px(rgba(7,17,27, .1))
          .food-name{
            font-size:14px
            line-height: 24px
            color:rgb(7,17,27)
          }
          .food-price{
            position: absolute
            right:95px
            bottom:12px
            font-size:14px
            line-height:24px
            color:rgb(240,20,20)
            font-weight:700
          }
          .cart-control{
            position:absolute
            right:0px
            bottom:6px
          }
        }
      }
    }
  }

  .shopcart-blur{
    position:fixed
    top:0
    left:0
    width:100%
    height:100%
    z-index:1               //此处z-index要小于shopcart组件的z-index,否则会遮挡住购物车列表
    background-color:rgba(7,17,27,.6)
    backdrop-filter:blur(5px)
    &.fade-enter-active,&.fade-leave-active{
      transition:all .4s linear
    }
    &.fade-enter,&.fade-leave-to{
      opacity:0
    }
  }
</style>
