<template>
  <div class="spinner"></div>
</template>

<style lang="stylus" scoped>
@import "~style/imports";

.spinner {
  margin: 50px;
  height: 28px;
  width: 28px;
  animation: rotate 0.8s infinite linear;
  border: 3px solid $primary-color;
  border-right-color: transparent;
  border-bottom-color: transparent;
  border-radius: 50%;
}

@keyframes rotate {
  0%    { transform: rotate(0deg); }
  100%  { transform: rotate(360deg); }
}
</style>
