<template>
  <div class="page not-found">
    <div>
      <h1 v-html="$parseEmoji(':cyclone:')"></h1>
      <p>It seems what you are looking for isn't here. It may have vanished in the infinite void of the web.</p>
      <button @click="$router.replace({ name: 'home' })">Get me out of this!</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'not-found',
}
</script>

<style lang="stylus" scoped>
@import "~style/imports";

.page {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  background: desaturate(darken($md-deep-purple-900, 20%), 60%);
  color: white;
}
</style>

<style lang="stylus">
.not-found {
  .emojione {
    width: 32px;
    height: 32px;
  }
}
</style>
