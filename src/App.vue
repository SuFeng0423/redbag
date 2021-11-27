<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang='less'>
@import url('./assets/css/index.less');
#app {
  max-width: 750px;
  min-height: 100vh;
  background: rgba(128, 125, 125, .1);
  margin: 0 auto;
}
</style>
