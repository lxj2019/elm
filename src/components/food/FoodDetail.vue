<template>
  <div>
    <transition name="move">
      <div v-show="showFlag" class="food-detail" ref="foodDetail">
        <div class="content">
        <div class="food-image">
          <img :src="food.image" alt="食物图片">
          <div class="back" @click="hide()">
            <span class="back-icon"></span>
          </div>
        </div>
        <div class="food-content">
          <h1 class="food-name">{{food.name}}</h1>
          <div class="food-data">
            <span class="count">月售{{food.sellCount}}份</span>
            <span>好评率{{food.rating}}%</span>
          </div>
          <div class="food-price">
            <span class="now">￥{{food.price}}</span>
            <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
          </div>
          <div class="add-cart">
            <cart-control :food="food"></cart-control>
          </div>
            <div v-show="!food.count||food.count === 0"class="buy"
            @click="addFoodCount()">加入购物车</div>
        </div>
          <split></split>
          <div v-show="food.info">
          <div class="food-info">
          <h2 class="title">商品介绍</h2>
          <p class="text">{{food.info}}</p>
          </div>
            <split></split>
        </div>
          <div class="rating">
            <h2 class="title">商品评价</h2>
<!--     引入评论选择组件，通过点击事件，传递给父组件并修改selectType、onlyContent的值，使评论模块展示对应的评论-->
            <rating-select :selectType="selectType" :onlyContent="onlyContent"
            :desc="desc" :ratings="food.ratings" v-on:updateType="updateType"
            v-on:updateOnlyContent="updateOnlyContent"></rating-select>
            <div class="ratings-list">
              <ul v-show="food.ratings && food.ratings.length">
                <li class="ratings-item border-1px" v-for="rating in food.ratings"
                v-show="showFoodItem(rating.rateType,rating.text)">
                  <div class="time">
                    {{rating.rateTime | formateDate}}
                  </div>
                  <div class="user">
                    <span class="username">{{rating.username}}</span>
                    <img class="avatar" :src="rating.avatar" alt="用户头像" width="12px"height="12px">
                  </div>
                  <p class="text">
                    <span :class="{'icon-thumbs-up':rating.rateType===0,'icon-thumbs-down':rating.rateType===1}"></span>
                      {{rating.text}}
                  </p>
                </li>
              </ul>
<!--              没有评论时，显示暂无评价-->
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Vue from 'vue'
  import BScroll from 'better-scroll'
  import {formatDate} from "../../common/js/date";
  import CartControl from "../cartcontrol/CartControl";
  import Split from "../split/Split";
  import RatingSelect from "../ratingSelect/RatingSelect";

  const ALL =2;
  export default {
    name: "FoodDetial",
    components:{
      CartControl,Split,RatingSelect
    },
    filters:{
      formateDate(time){
        let date = new Date(time)
        return  formatDate(date,'yyyy-MM-dd hh:mm');
      }
    },
    props: {
      food: {
        type:Object
      }
    },
    data() {
      return {
        showFlag:false,
        onlyContent: true,
        desc:{
          all:'全部',
          positive:'推荐',
          negative:'吐槽'
        },
        selectType: ALL
      }
    },
    methods: {
      show() {
        this.showFlag = true;             //显示商品详情页页面
        this.onlyContent= true;          //初始化数据
        this.desc={
          all:'全部',
          positive:'推荐',
          negative:'吐槽'
        };
        this.selectType=ALL
        this.$nextTick(()=>{
          if(!this.scroll){               //添加滚动条
            this.scroll = new BScroll(this.$refs.foodDetail,{
              click:true
            });
          }else {
            this.scroll.refresh();          //重新计算滚动条长度
          }
        })
      },
      hide() {
        this.showFlag = false;            //隐藏页面
      },
      addFoodCount(){
        console.log('click');
        if (!Event.constructor){
          return
        }
        Vue.set(this.food,'count',1)
      },
      showFoodItem(type,text){              //通过3次判断，来决定评论是否显示

        if(this.onlyContent && !text){      //如果选中只有内容的评论，则没有内容的评论不展示
          return false;
        }
        if(this.selectType === ALL){        //2.如果选中全部，则显示,否则继续判断
          return true ;
        }
        return this.selectType === type       //评论类型和选中的类型符合才返回true
      },
      updateType(type){                           //处理RatingSelect子组件发射过来的事件，修改selectType
        this.selectType = type
        // this.$nextTick(()=>{
        //   this.scroll.refresh()
        // })
      },
      updateOnlyContent(flag){              //处理RatingSelect子组件发射过来的事件，修改onlyContent
        this.onlyContent = flag
        // this.$nextTick(()=>{
        //   this.scroll.refresh()
        // })
      },

    }


  }
</script>

<style lang="stylus" ref="stylesheet/stylus"  scoped>
  @import "../../common/stylus/mixin.styl"
  .food-detail
    position: fixed
    top:0
    bottom:48px
    z-index:30
    width:100%
    background-color: #fff
  &.move-enter,&.move-leave-to
    opacity: 0
    transform : translate3d(100%,0,0)
  &.move-enter-active,&.move-leave-active
    transition: all .2s linear
  .food-image
    position: relative
    width:100%
    height:0
    padding-top:100%      //设置padding-top为100%，这样高度就会和宽度一样
    img
      position: absolute
      top: 0
      left: 0
      width: 100%
      height:100%
    .back
      position :absolute
      top:0
      left:0s
      .back-icon
        display: block
        padding:10px
        font-family:icomoon
        font-size:16px
        color:#fff
  .food-content
    position:relative
    width:100%
    padding:18px
    .food-name
      font-size:14px
      font-weight:700
      color:rgb(7,17,27)
      line-height:14px
    .food-data
      margin-top 8px
      font-size:10px
      color:rgb(147,153,159)
      line-height:12px
      .count
        margin-right:6px
    .food-price
      display:inline-block
      margin:18px 0
      line-height:24px
      .now
        font-size:14px
        color:red
        font-weight:700
      .old
        font-size:10px
        text-decoration:line-through
        color:rgb(147,153,159)
    .add-cart
      position:absolute
      bottom:12px
      right:12px
    .buy
      position: absolute
      bottom: 18px
      right: 18px
      z-index: 10
      height: 24px
      line-height: 24px
      padding: 0 12px
      background-color: rgb(0, 160, 220)
      border-radius: 12px
      font-size: 10px
      color: #ffffff
  .food-info
    padding:18px
    .title
      line-height:14px
      margin-bottom:12px
      font-size:14px
    .text
      line-height: 24px
      padding: 0 8px
      font-size:12px
      color:rgb(77,85,93)
  .rating
    padding-top: 18px
    .title
      line-height: 14px
      margin-left: 18px
      margin-bottom: 12px
      font-size: 14px
    .ratings-list
      padding: 0 18px
      .ratings-item
        position: relative
        padding: 16px 0
        border-1px(rgba(7, 17, 27, .1))
        .user
          position: absolute
          top: 16px
          right: 0
          .username
            display: inline-block
            margin-right: 6px
            vertical-align: top
            font-size: 10px
            color: rgb(147, 153, 159)
            line-height: 12px
          .avatar
            border-radius: 6px
        .time
          margin-bottom:6px
          font-size: 10px
          color: rgb(147, 153, 159)
          line-height: 12px
        .text
          display:inline-block
          line-height: 32px
          font-size:16px
          color:rgb(7,17,27)
          .icon-thumbs-up,.icon-thumbs-down
            margin-right: 4px
            line-height:12px
            font-size: 12px
          .icon-thumbs-up
            color:rgb(0,160,220)
          .icon-thumbs-down
            color:rgb(147,153,159)
      .no-rating
        padding:16px 0
        font-size:12px
        color:rgb(147,153,159)
</style>
