<template>
  <div class="header">
<!--    商家内容-->
    <div class="seller-content">
<!--      商家头像-->
      <div class="avator">
        <img :src="seller.avatar" alt="商家头像" width="64px" height="64px">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports"  class="support">
          <span class="icon" :class="classList[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
<!--        设置按钮，点击后显示详情界面-->
        <div class="support-count" @click="showDetail" v-if="seller.supports">
          <span class="count">{{seller.supports.length}}个</span>
          <span class="right-icon"></span>
        </div>
      </div>
    </div>
<!--    商家公告-->
    <div class="seller-bulletin">
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <span class="buttetin-icon"></span>
    </div>
<!--    设置header背景-->
    <div class="background">
      <img :src="seller.avatar" alt="" width="100%"height="100%">
    </div>
<!--    设置详情界面，添加过渡效果-->
    <transition>
      <div v-show="detailShow" class="detail">
        <div class="detail-content">
          <div class="detail-main">
            <h1 class="seller-name">{{seller.name}}</h1>
            <Star :size="48" :score="seller.score" class="star"></Star>
            <!--          复用详情页标题组件-->
            <v-title title="商家优惠"></v-title>

            <ul v-if="seller.supports" class="discount-info">
              <li v-for="item in seller.supports" class="discount-item" >
                <span class="icon" :class="classList[item.type]"></span>
                <span class="description">{{item.description}}</span>
              </li>
            </ul>
            <v-title title="商家信息"></v-title>
            <div class="bulletin">{{seller.bulletin}}</div>
          </div>
        </div>
        <div class="detail-close" @click="closeDetail()">
          <span class="close-icon"></span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import Star from "../star/Star.vue"
  import Title from "../common/Title";
  export default {
    name: "Header",
    components:{
      Star,
      "v-title":Title
    },
    props:{
      seller:{
        type:Object,
        default:{}
      }
    },
    data(){
      return{
        classList:['decrease', 'discount', 'special', 'invoice', 'guarantee'],
        detailShow:false
      }
    },
    methods:{
      showDetail(){
        this.detailShow=true
      },
      closeDetail(){
        this.detailShow=false
      }
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin";
  .header {
    position: relative
    color: #fff;
    overflow: hidden
    background-color: rgba(07, 17, 27, .5)
    .seller-content {
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0px
      .avator {
        display: inline-block
        img {
          border-radius: 4px;
        }
      }
      .content {
        display: inline-block
        margin-left: 16px
        font-size: 14px
        .title {
          margin: 2px 0 8px 0
          .brand {
            display: inline-block
            vertical-align: top
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 32px 20px
            background-repeat: no-repeat
          }
          .name {
            margin-left: 6px
            font-size: 16px
            font-weight: bold
            line-height: 18px
          }
        }
        .description {
          font-size: 12px
          line-height: 12px
          margin-bottom 10px
        }
        .support {
          .icon {
            display: inline-block
            width: 12px
            height: 12px
            margin-right: 4px
            vertical-align: middle
            background-size: 12px 12px
            background-repeat: no-repeat
            //根据折扣还是满减，设置不同的图标
            &.decrease {
              bg-image('decrease_1')
            }
            &.discount {
              bg-image('discount_1')
            }
            &.guarantee {
              bg-image('guarantee_1')
            }
            &.invoice {
              bg-image('invoice_1')
            }
            &.special {
              bg-image('special_1')
            }
          }
          .text {
            line-height: 10px
            font-size: 10px
          }
        }
      }
      .support-count {
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0px 8px
        height: 24px
        line-height: 24px
        border-radius: 14px
        font-size: 10px
        background-color: rgba(0, 0, 0, 0.2)
        .right-icon {
          font-family: icomoon
          vertical-align: center
        }
      }
    }
    //商家公告样式--start
    .seller-bulletin {
      height: 28px
      line-height: 28px
      padding: 0px 12px
      font-size: 10px
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      background-color: rgba(7, 17, 27, .2)
      .bulletin-title {
        display: inline-block
        width: 22px
        height: 12px
        vertical-align: middle
        bg-image('bulletin')
        background-size: 22px 12px;
        background-repeat: no-repeat
      }
      .bulletin-text {
        margin: 0px 4px 0 4px
        font-size: 10px
      }
      .buttetin-icon {
        position: absolute
        display: inline-block
        right: 0px
        font-size: 10px
        font-family: icomoon
      }
    }
    //背景模块样式
    .background {
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      z-index: -1
      filter: blur(5px)
    }
    //详情模块
    .detail {
      position: fixed;
      top: 0
      left: 0
      z-index: 100
      width: 100%
      height: 100%
      overflow: auto
      transition:all 0.5s
      background-color: rgba(07, 17, 27, .8)
      //添加过渡效果
      &.v-enter-active{
        transition:all 0.8s ease
      }
      &.v-enter,v-leave{
        opacity:0
        transform: translateY(40px);
      }
      .detail-content {
        min-height: 100%
        .detail-main {
          padding-top: 64px
          padding-bottom: 64px
          .seller-name {
            margin: 0 auto
            font-size: 16px
            font-weight: 700
            text-align center
          }
          .star {
            display: inline-block
            width:100%
            text-align center
            margin: 18px auto 0;
            padding: 2px 0
          }
          .title {
            margin: 28px auto 24px auto
          }
          .discount-info {
            width: 80%
            margin: 24px auto
            .discount-item {
              margin-bottom: 12px
              padding: 0 12px
              font-size: 0
              &:last-child {
                margin-bottom 0
              }
              .icon {
                display: inline-block
                width: 16px
                height: 16px
                margin-right: 6px
                vertical-align: top
                background-size: 16px 16px
                background-repeat: no-repeat
                //根据折扣还是满减，设置不同的图标
                &.decrease {
                  bg-image('decrease_2')
                }
                &.discount {
                  bg-image('discount_2')
                }
                &.guarantee {
                  bg-image('guarantee_2')
                }
                &.invoice {
                  bg-image('invoice_2')
                }
                &.special {
                  bg-image('special_2')
                }
              }
              .description {
                font-size: 12px
              }
            }
          }
          .bulletin {
            width: 80%
            margin: 0 auto
            padding: 0 12px
            font-size: 12px
            line-height: 24px
          }
        }
        }
      .detail-close{
          position: relative
          margin: -64px auto 0 auto
          width: 32px
          height: 32px
          clear: both
          .close-icon{
            font-family:icomoon
            font-size: 32px
          }
        }
      }

  }
</style>
