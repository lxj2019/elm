<template>
  <div class="star" :class="starType">
    <span v-for="(itemClass,index) in itemClasses" :class="itemClass"
    class="star-item"></span>
  </div>
</template>

<script>
  const LENGTH = 5          //star 总的数量
  const CLS_ON = 'on'         //全星
  const CLS_OFF = 'off'           //空星
  const CLS_HALF = 'half'         //半星
  export default {
    name: "Star",
    data(){
      return{
      }
    },
    props:{
      size:{
        type:Number
      },
      score:{
        type:Number
      }
    },
    computed:{
      starType() {
        return "star-" + this.size;
      },
      itemClasses(){
        let result = [];
        let score = Math.floor(this.score*2)/2;   //将分数乘以2再绝对值除以2，将小数小于0.5的分数过滤掉
        let hasHalf = score % 1 !== 0;      //有小数的说明大于0.5，说明有半颗星
        let onNum = Math.floor(score)         //全星的数量
        for(let i=0;i<onNum;i++){
          result.push(CLS_ON)
        }
        if(hasHalf) result.push(CLS_HALF)     //有半星
        while(result.length<LENGTH)  {        //检查星星的数量是否满足数量，不足则添加空星
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus" scoped>
  @import "../../common/stylus/mixin";
  .star{
    .star-item{
      display:inline-block
      background-repeat:no-repeat
    }
    &.star-24{
     .star-item{
       width:10px
       height:10px
       margin-right:3px
       background-size:15px 15px
       &:last-child{
         margin-right: 0
       }
       &.on{
         bg-image('star24_on')
       }
       &.half{
         bg-image('star24_half')
       }
       &.off{
         bg-image('star24_off')
       }
     }
   }
    &.star-36{
      .star-item{
        width:15px
        height:15px
        margin-right:6px
        background-size:15px 15px
        &:last-child{
          margin-right: 0
        }
        &.on{
          bg-image('star36_on')
        }
        &.half{
          bg-image('star36_half')
        }
        &.off{
          bg-image('star36_off')
        }
      }
    }
    &.star-48{
      .star-item{
        width:20px
        height:20px
        margin-right:22px
        background-size:20px 20px
        &:last-child{
          margin-right: 0
        }
        &.on{
          bg-image('star36_on')
        }
        &.half{
          bg-image('star48_half')
        }
        &.off{
          bg-image('star48_off')
        }
      }
    }
  }
</style>
