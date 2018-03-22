<template>
  <div class="header">
    <h1 class="logo">
      <div class="icon">?</div>
      <span>问卷调查</span>
    </h1>
    <div class="my-reserach">
      <router-link to="/newresearch">我的问卷</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'vHeader'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @import "../common/scss/base";
  .header {
    height: 60px;
    background: $lightBlue;
    .logo {
      float: left;
      margin-top: 18px;
      margin-left: 20px;
      font-size: 18px;
      color: #fff;
      .icon {
        display: inline-block;
        border-radius: 50%;
        width: 24px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        color: $lightBlue;
        background: #fff;
      }
      span {
        display: inline-block;
        font-weight: 700;
      }
    }
    .my-reserach {
      height: 100%;
      line-height: 60px;
      font-size: 16px;
      & > a {
        margin-left: 40px;
        font-weight: 700;
        color: #fff;
      }
      & > a:hover {
        color: darken($blue, 10%);
      }
    }
  }
</style>
