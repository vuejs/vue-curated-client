<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
}
</script>

<style lang="scss">
@import "~style/imports";

body {
  margin: 0;
  font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html,
body,
#app {
  height: 100%;
}

.material-icons {
  font-size: inherit;
  width: 1em;
  height: 1em;
  vertical-align: middle;
  display: inline-block;
  cursor: inherit;
  position: relative;
  top: -.08em;
}

a {
  color: $primary-color;
  text-decoration: none;

  &:hover {
    color: lighten($primary-color, 10%);
  }
}

button,
input {
  font-size: inherit;
  font-family: inherit;
  border: none;
  outline: none;
  padding: 12px 24px;
  border-radius: 2px;
}

button {
  background: $primary-color;
  color: white;
  cursor: pointer;
  display: inline-block;
  text-align: center;
  transition: background .3s;

  &:hover {
    background: lighten($primary-color, 10%);
  }
}

input {
  background: white;
  display: block;
  margin-bottom: 12px;
  width: 100%;
  box-sizing: border-box;
  border: solid 1px $md-grey-100;
  border-bottom: solid 2px $md-grey-300;
  text-align: left;

  &:focus {
    border-bottom-color: $primary-color;
  }
}

.search-input {
  position: relative;
  display: block;

  input {
    padding-left: 42px;
  }

  .icon {
    position: absolute;
    top: 14px;
    left: 14px;
    z-index: 1;
    font-size: 20px;
  }
}

.tooltip {
  display: none;
  opacity: 0;
  transition: opacity .15s;
  pointer-events: none;
  padding: 4px;
  z-index: 10000;
  font-size: 14px;

  .tooltip-content {
    background: rgba(black, .7);
    color: white;
    border-radius: 2px;
    padding: 5px 10px 4px;
  }

  &.tooltip-open-transitionend {
    display: block;
  }

  &.tooltip-after-open {
    opacity: 1;
  }
}

.markdown {
  img {
    max-width: 100%;
  }

  :first-child {
    margin-top: 0;
  }

  h1,
  h2,
  h3 {
    font-weight: 300;
  }

  h1 {
    font-size: 32px;
  }

  h2 {
    font-size: 30px;
    color: lighten(black, 30%);
  }

  h3 {
    font-size: 24px;
    color: lighten(black, 50%);
  }

  blockquote {
    border-left: solid 6px $primary-color;
    margin-left: 0;
    padding: 6px 12px;

    :last-child {
      margin-bottom: 0;
    }
  }

  p code,
  pre {
    background: darken(white, 5%);
    border-radius: 2px;
  }

  p code {
    padding: 0 2px;
  }

  pre {
    padding: 12px;
  }
}
</style>
