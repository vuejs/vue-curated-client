<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
@import "~style/imports";

body {
  margin: 0;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 24px;
}

a {
  color: $primary-color;
  text-decoration: none;
}

.material-icons {
  font-size: inherit;
  line-height: 1;
  vertical-align: text-top;
}
</style>
