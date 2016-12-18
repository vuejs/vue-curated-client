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
}

html,
body,
#app {
  height: 100%;
}

a {
  color: $primary-color;
  text-decoration: none;

  &:hover {
    color: lighten($primary-color, 10%);
  }
}

.material-icons {
  font-size: inherit;
  line-height: 1;
  vertical-align: text-top;
}
</style>
