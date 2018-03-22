<template>
  <div class="new-research wrapper">
    <el-button type="primary" icon="plus" class="create-btn">新建问卷</el-button>
  </div>
</template>

<script>
export default {
  name: 'newResearch'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .new-research {
    box-sizing: border-box;
    padding-top: 70px;
    height: 200px;
    .create-btn {
      display: block;
      margin: 0 auto;
    }
  }
</style>
