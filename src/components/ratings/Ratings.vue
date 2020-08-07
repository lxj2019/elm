<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="store-score">
        <div class="score-left">
          <p class="overall-rating">3.9</p>
          <p class="title">综合评分</p>
          <p class="rank">高于周边商家{{seller.rankRate}}%</p>
        </div>
        <div class="score-right">
          <div class="score-box">
            <span class="title">服务态度</span>
            <Star :size="36" :score="seller.serviceScore"></Star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-box">
            <span class="title">商品评分</span>
            <Star :size="36" :score="seller.foodScore" class="star"></Star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-box">
            <span class="title">送达时间</span>
            <span class="delivery-time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <Split></Split>
      <div class="ratings-select">
        <rating-select :only-content="onlyContent" :select-type="selectType"
        :ratings="ratings" @updateType="updateType" @updateOnlyContent="updateOnlyContent"></rating-select>
      </div>
      <div  v-show="ratings && ratings.length" class="ratings-list">
        <ul>
          <li v-for="rating in ratings" class="rating-item">
              <div class="avatar">
                <img :src="rating.avatar" alt="用户头像" width="28px"height="28px">
              </div>
              <div class="content">
                <h1 class="name">{{rating.username}}}</h1>
                <div class="star-box">
                  <Star :size="24" :score="rating.score"></Star>
                  <span class="delivery-time" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
                </div>
                <p class="text">{{rating.text}}</p>
                <div v-show="rating.recommend && rating.recommend.length" class="recommend">
                    <span class="icon-thumbs-up"></span>
                  <span class="item" v-for="item in rating.recommend">{{item}}</span>
                </div>
                <div class="time"> {{rating.rateTime | formatDate}}</div>
              </div>
              <div></div>
          </li>
        </ul>
      </div>
      <div v-show="!ratings || !ratings.length" class="no-ratings">暂无评论</div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from "../../common/js/date";
  import BScroll from "better-scroll"
  import Split from "../split/Split";
  import RatingSelect from "../ratingSelect/RatingSelect";
  import Star from "../star/Star";
  import {request} from "../../network/request";

  const ALL = 2;
  const POSITIVE = 0;
  const NEGATIVE = 1;
  export default {
    name: "Ratings",
    components:{
      Split,RatingSelect,Star
    },
    filters:{
      formatDate(time){
        let date = new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm')
      }
    },
    data(){
      return{
        ratings:[],
        onlyContent:true,
        selectType:ALL
      }
    },
    props:{
      seller:{
        type:Object
      }
    },
    mounted() {
      request({
        url:'ratings',
        method:'get'
      }).then((res)=>{
        let data = res.data
       if(data.errno ===0){
         this.ratings = data.data;
         this.$nextTick(()=>{
            this.scroll = new BScroll(this.$refs.ratings,{
              click:true
            })
         })
       }
      });
    },
    methods:{
      updateType(type){
        this.selectType = type
      },
      updateOnlyContent(flag){
        this.onlyContent = flag
      }
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus"  scoped>

  .ratings{
    position:absolute
    top:174px
    bottom:0
    left:0
    width: 100%
    overflow:hidden
    .ratings-content{
      .store-score{
        display: flex
        padding:18px 0
        color:red
        .score-left{
          flex: 0 0 137px
          padding:6px 0
          width: 137px
          border-right: 1px solid rgba(7, 17, 27, .1)
          text-align: center
          @media only screen and (max-width:320px) {
            flex: 0 0 100px
            width: 100px
          }
          .overall-rating{
            margin-bottom: 6px
            line-height: 28px
            font-size:24px
            color:rgb(255,153,0)
          }
          .title{
            font-size:12px
            line-height:12px
            margin-bottom:8px
            color:rgb(7,17,27)
          }
          .rank{
            line-height: 10px
            font-size:10px
            color:rgb(147,153,159)
          }
        }
        .score-right {
          flex: 1
          padding: 6px 0 0 24px
          @media only screen and (max-width:320px) {
            padding-left:16px
          }
          .score-box{
            font-size:0
            margin-bottom:8px
            .title{
              font-size:12px
              color:rgb(7,17,27)
              line-height:18px
            }
            .star{
              display:inline-block
              vertical-align:top
              margin:0 12px
            }
            .score{
              display:inline-block
              vertical-align:top
              font-size:12px
              color:rgb(255,153,0)
              line-height:18px
            }
          }
          .delivery-box{
            font-size:0
            .title{
              font-size:12px
              color:rgb(7,17,27)
              line-height:18px
            }
            .delivery-time{
              margin-left:12px
              line-height: 18px
              font-size:12px
              color:rgb(147,153,159)
            }
          }
        }
      }
      .ratings-list{
        position: relative
        left:0
        bottom:0;
        width:100%
        padding:0 18px
        .rating-item{
          display:flex
          position: relative
          padding:18px 0
          border-bottom:1px solid rgba(7,17,27,.1)
          .avatar{
            flex:0 0 28px
            width:28px
            height:100px
            .img{
              border-radius:50%
            }
          }
          .content{
            position:relative
            flex:1
            padding:0 12px
            .name{
              font-size:10px
              color:rgb(7,17,27)
              line-height:12px
            }
            .star-box{
              margin:6px 0
              .star{
                display:inline-block
                margin-right:6px
              }
              .delivery-time{
                line-height:12px
                font-size:10px
                color:rgb(147,153,159)
                font-weight:200
              }
            }
            .text{
              line-height: 18px
              font-size:12px
              color:rgb(7,17,27)
              margin-bottom:8px
            }
            .recommend{
              line-height:16px
              .icon-thumbs-up,.item{
                display:inline-block
                margin:0 8px 4px 0
                font-size:0
              }
              .icon-thumbs-up{
                font-size:12px
                color: rgb(0,160,220)
              }
              .item{
                padding:0 6px
                font-size:9px
                border:1px solid rgba(7,17,27,.1)
                border-radius:1px;
                color:rgb(147,153,159)
              }
            }
            .time{
              position: absolute
              right:0
              top:0
              line-height: 12px
              font-size:10px
              font-weight:200
              color:rgb(147,153,159)
            }
          }
        }
      }
    }
  }
</style>
