<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
<!--      商家评分-->
      <div class="seller-evaluate">
        <h1 class="name">{{ seller.name }}</h1>
        <div class="desc border-1px">
          <Star :size="36" :score="seller.score"></Star>
          <span class="text">({{ seller.ratingCount }})</span>
          <span class="text">月售{{ seller.sellCount }}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="stress">{{ seller.minPrice }}</span>元
            </div>
          </li>
          <li class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryPrice }}</span>元
            </div>
          </li>
          <li class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="stress">{{ seller.deliveryTime }}</span>分钟
            </div>
          </li>
        </ul>
        <div class="collection" @click="toggleCollect">
          <span class="icon-favorite" :class="{active:hasCollection}"></span>
          <span class="text" >{{collectionText}}</span>
        </div>
       </div>
      <Split></Split>
<!--      商家公告-->
      <div class="seller-bulletin">
          <h1 class="title">商家公告与活动</h1>
          <p class="text">{{seller.bulletin}}</p>
        <ul class="siupports-list">
          <li v-for="support in seller.supports" class="siupport">
            <div class="icon" :class="showType[support.type]"></div>
            <span class="description">{{support.description}}</span>
          </li>
        </ul>
        </div>
      <Split></Split>
<!--      商家实景-->
      <div class="seller-scene">
        <h1 class="title">商家实景</h1>
        <div class="pic-wrapper" ref="picWrapper">
          <ul class="pic-list" ref="picList">
            <li v-for="pic in seller.pics" class="pic">
              <img :src="pic" alt="商家图片" width="120px" height="90px">
            </li>
          </ul>
        </div>
      </div>

      <Split></Split>
<!--      商家信息-->
      <div class="seller-infos">
        <h1 class="title">商家信息</h1>
        <ul class="infos-list">
          <li v-for="info in seller.infos" class="info">
            <p class="text">{{info}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import Star from '../star/Star';
  import Split from '../split/Split';
  import BScroll from 'better-scroll';
  //import { saveToLocal, loadFromLocal } from 'common/js/store';
  export default{
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      Star,
      Split
    },
    data() {
      return {
        showType: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        hasCollection:false
      }
    },

    mounted() {
      // 页面整体滚动
      this.scroll = new BScroll(this.$refs.seller, {
        click: true
      });

      // 商家图片横向滚动
      if(this.seller.pics){
        let picWidth = 120;                //每张图片宽度
        let margin = 6;                    //图片之间的距离
        let width = (picWidth + margin) * this.seller.pics.length-margin;      //计算整个picList的宽度
        this.$refs.picList.style.width = width + 'px';
        this.$nextTick(()=>{
          this.picScroll = new BScroll(this.$refs.picWrapper,{
            scrollX:true,                          //定义横向滚动
            eventPassthrough:'vetical'            //滚动时忽略垂直方向的滚动
          })
        })
      }
    },
    computed: {
      collectionText(){
        return this.hasCollection ? '已收藏':"收藏"
      }
    },
    methods: {
      toggleCollect(){
        this.hasCollection = !this.hasCollection
      }
    }
  }
</script>

<style rel="stylesheet/stylus" lang="stylus" scoped>
  @import "../../common/stylus/mixin";

  .seller {
    position: absolute
    top: 174px
    bottom: 0
    left: 0
    width: 100%
    overflow: hidden
    .seller-evaluate {
      position: relative
      padding: 18px
      .name {
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      }
      .desc {
        padding-bottom: 18px
        border-1px(rgba(7, 17, 27, .1));
        font-size: 0
        .star {
          display: inline-block
          vertical-align: top
          margin-right: 8px
        }
        .text {
          display: inline-block
          vertical-align: top
          margin-right: 12px
          line-height: 18px
          font-size: 10px
          color: rgb(77, 85, 93)
        }
      }
      .remark {
        display:flex
        padding:18px
        .block{
          flex:1
          text-align:center
          border-right:1px solid rgba(7,17,27,.1)
        }
        h2{
          margin-bottom:4px
          line-height: 10px
          font-size:10px
          color:rgb(147,153,159)
        }
        .content{
          line-height:24px
          font-size:10px
          color:rgb(7,17,27)
          font-weight:200
          .stress{
            font-size:24px
          }
        }
      }
      .collection{
        position:absolute
        width:50px
        top:18px
        right:11px
        text-align:center
        .icon-favorite{
          display: block
          margin-bottom:4px
          line-height:24px
          font-size:24px
          color:#d4d6d9
          &.active{
            color:rgb(240,20,20)
          }
        }
        .text{
          font-size:10px
          line-height:10px
          color:rgb(77,85,93)
        }
      }
    }
    .seller-bulletin{
      padding:0 18px
      .title{
        margin-top:18px
        margin-bottom: 8px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      }
      .text{
        margin:0px 12px 16px
        line-height:24px
        font-size:14px
        font-weight:200
        color:rgb(240,20,20)
      }
      .siupports-list{
        .siupport{
          padding:16px 12px
          border-top:1px solid rgba(7,17,27,.1)
          .icon{
            display: inline-block;
            vertical-align: top;
            width: 16px;
            height: 16px;
            margin-right: 6px;
            background-size: 16px 16px;
            background-repeat: no-repeat;
            &.decrease{
             bg-image("decrease_4")
            }
            &.discount{
             bg-image("discount_4")
            }
            &.invoice{
             bg-image("invoice_4")
            }
            &.special{
              bg-image("special_4")
            }
            &.guarantee{
             bg-image("guarantee_4")
            }
          }
          .description{
            line-height:16px
            font-size:12px
            font-weight:200
            color:rgb(7,17,27)
          }
        }
      }
    }
    .seller-scene{
      padding:18px 0 18px 18px
      .title{
        margin-bottom: 12px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      }
      .pic-wrapper{
        width:100%
        overflow: hidden
        white-space: nowrap
        .pic-list{
          font-size:0
          .pic{
            display:inline-block
            width:120px
            height:90px
            margin-right:6px
            &.last-child{
              margin-right:0
            }
          }
        }
      }
    }
    .seller-infos{
      padding:18px 18px 0
      .title{
        margin-bottom: 12px
        line-height: 14px
        color: rgb(7, 17, 27)
        font-size: 14px
      }
      .infos-list{
        .info{
          padding:16px 12px
          border-top:1px solid rgba(7,17,27,.1)
          .text{
            line-height:16px
            font-size:12px
            font-weight:200
            color:rgb(7,17,27)
          }
        }
      }
    }

  }
</style>
