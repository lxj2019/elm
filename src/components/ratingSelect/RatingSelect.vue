<template>
  <div class="rating-select">
    <div class="rating-type">
      <span @click="select(2)" class="block positive" :class="{active:selectType===2}">{{desc.all}}
        <span class="count">{{ratings.length}}</span></span>
      <span @click="select(0)" class="block positive" :class="{active:selectType===0}">{{desc.positive}}
        <span class="count">{{positiveCount.length}}</span></span>
      <span @click="select(1)" class="block negative" :class="{active:selectType===1}">{{desc.negative}}
        <span class="count">{{negativeCount.length}}</span></span>
    </div>
    <div class="switch" :class="{'on':onlyContent===true}" @click="toggle()">
      <span class="icon"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script>
  const POSITIVE = 0;    //正向评价
  const NEGATIVE = 1;    //负向评价
  const ALL = 2;          //全部
  export default {
    name: "RatingSelect",
    data(){
      return{
      }
    },
    props:{
      ratings:{            //评论
        type:Array,
        default(){
          return []
        }
      },
      selectType:{         //选中的类型，
        type:Number,
        default:ALL
      },
      onlyContent:{        //是否只显示有内容的评价
        type:Boolean,
        default:false
      },
      desc:{                //类型的描述
        type:Object,
        default(){
          return{
            all:'全部',
            positive:'满意',
            negative:'不满意'
          }
        }
      }
    },
    computed:{
      positiveCount(){                        //过滤出好评
        return this.ratings.filter((rating)=> rating.rateType === POSITIVE)
      },
      negativeCount(){                      //过滤出差评
         return this.ratings.filter((rating)=> rating.rateType === NEGATIVE)
      }

    },
    methods:{
      select(type){
        if(!Event.constructor){
          return
        }
        //this.selectType = type        //这里不用自己修改selectType,向父组件传递事件并修改，然后通过父传子来修改props
        this.$emit('updateType',type)    //向父组件传递事件与参数
      },
      toggle(){
        if(!Event.constructor){
          return
        }
        this.$emit('updateOnlyContent',!this.onlyContent)    //向父组件传递事件与参数
      }
    }

  }
</script>

<style lang="stylus" ref="stylesheet/stylus"  scoped>
  @import "../../common/stylus/mixin.styl"
  .rating-type
    padding:18px 0
    margin:0 18px
    border-1px(rgba(7,17,27,.1))
    font-size:0
    .block
      display:inline-block
      padding:8px 12px
      border-radius:1px
      font-size:12px
      color:rgb(77,85,93)
      &.active
        color: #fff
      &.positive
        background-color: rgba(0,160,220,.2)
        &.active
          background-color: rgb(0,160,220)
      &.negative
        background-color: rgba(77,85,9,.2)
        &.active
          background-color: rgb(77,85,93)
  .switch
    padding:12px 18px
    line-height:24px
    border-bottom:1px solid rgba(7,17,27,.1)
    color:rgb(147,153,159)
    &.on
      .icon
        color:green
    .icon
      display:inline-block
      vertical-align: top
      margin-right:4px
      font-size:24px
      font-family:icomoon
    .text
      display:inline-block
      vertical-align: top
      font-size:12px
</style>
