<template>
  <div class="shopcart">
    <div class="content">
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
          <div class="pay" :class="{enough:isEnough}">
            {{payDesc}}
          </div>
      </div>
      <div class="shopcart-list" v-show="false">
        <div class="list-head">
          <h1 class="title">购物车</h1>
          <span class="clearCart">清空</span>
        </div>
        <div class="list-content">
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
    </div>

  </div>
</template>

<script>
  import CartControl from "../cartcontrol/CartControl";
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
      minPrice:{
        type:Number,
        default:5
      }
    },
    data() {
      return{
        isEnough :false,         //判断是否足够起送
        // balls: [
        //   {show:false},{show:false},{show:false},{show:false},{show:false}
        // ]
      }
    },
    computed:{
    totalPrice() {           //计算商品的总价格
      let total=0;
      this.selectFoods.forEach((food)=>{
        total+=food.price * food.count
      });
      return total;
    },
    totalCount() {         //计算商品数量的总和
      let total = 0;
      this.selectFoods.forEach((food)=>{
        total+=food.count
      });
      return total;
    },
      payDesc() {                    //计算是总价否大于起送价格
        if(this.totalPrice<this.minPrice){              //小于则显示还差多少
          this.isEnough =false                          //起送标记为false
          let price = this.minPrice-this.totalPrice
          return `还差￥${price}元起送`
        }else{
          this.isEnough = true
          return "去结算"                  //大于则显示去结算
        }
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
    width:100%
    height:48px
    z-index:50
    background: #141d27
    .content{
      display: flex
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
      .shopcart-list{

      }
  }

  }


</style>
