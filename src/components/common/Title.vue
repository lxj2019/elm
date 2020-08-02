<template>
  <div class="title">
    <div class="line"></div>
    <div class="text">{{title}}</div>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    name: "Title",
    props:{
      title:{
        type:String,
        default:'没有标题'
      }
    }
  }
</script>

<style scoped>
  .title {
    display: flex;
    width: 80%;
  }
  .title .line{
    flex: 1;
    position: relative;
  /*//使底边居中*/
    top: -6px ;
    border-bottom: 1px solid rgba(255, 255, 255, .2);
  }
  .title .text{
    padding: 0 12px;
    font-size: 14px;
    font-weight: 700;
  }
</style>
