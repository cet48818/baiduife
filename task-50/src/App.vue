<template>
  <div id="app">
    <v-header></v-header>
    <router-view></router-view>
  </div>
</template>

<script>
import vHeader from './components/Header'
export default {
  name: 'app',
  components: {
    vHeader
  }
}
</script>

<style lang="scss">
  @import "./common/scss/base";
  #app {
    height: 2000px;
    background: $mainGrey;
  }
</style>
