<template>
  <div class="home-page page-content">

    <section class="hero">

      <div class="hero-badge">featured</div>

      <div class="info">
        <div class="label">
          <span>
            <img class="avatar" src="https://avatars1.githubusercontent.com/u/6128107?v=3&s=200" />
            <span class="name">vue-router</span>
            <span class="category">Routing</span>
          </span>
        </div>
        <div class="message">
          <span>Recently updated!</span>
          <a href="https://github.com/vuejs/vue-router/releases">See what's new <i class="material-icons">arrow_forward</i></a>
        </div>
      </div>

    </section>

    <section>
      <h1><i class="material-icons">whatshot</i> Trending</h1>
      <div class="modules">
        <div v-for="module of modules" class="module">
          <span class="label">
            <img class="avatar" :src="module.icon" />
            <span class="name">{{ module.name }}</span>
            <span class="category">{{ module.category }}</span>
          </span>
        </div>
      </div>
    </section>

    <section>
      <h1><i class="material-icons">star</i> Popular</h1>
      <div class="modules">
        <div v-for="module of modules" class="module">
          <span class="label">
            <img class="avatar" :src="module.icon" />
            <span class="name">{{ module.name }}</span>
            <span class="category">{{ module.category }}</span>
          </span>
        </div>
      </div>
    </section>

    <section>
      <h1><i class="material-icons">history</i> Recent</h1>
      <div class="modules">
        <div v-for="module of modules" class="module">
          <span class="label">
            <img class="avatar" :src="module.icon" />
            <span class="name">{{ module.name }}</span>
            <span class="category">{{ module.category }}</span>
          </span>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
const vueAvatar = 'https://avatars1.githubusercontent.com/u/6128107?v=3&s=200'
const nuxtAvatar = 'https://avatars0.githubusercontent.com/u/23360933?v=3&s=200'
const kazuponAvatar = 'https://avatars3.githubusercontent.com/u/72989?v=3&s=460'
const akryumAvatar = 'https://avatars3.githubusercontent.com/u/2798204?v=3&s=460'

export default {
  name: 'home',

  data () {
    return {
      modules: [
        { icon: vueAvatar, name: 'vue', category: 'Core' },
        { icon: vueAvatar, name: 'vue-router', category: 'Routing' },
        { icon: vueAvatar, name: 'vuex', category: 'State' },
        { icon: nuxtAvatar, name: 'nuxt', category: 'Framework' },
        { icon: kazuponAvatar, name: 'vue-i18n', category: 'i18n' },
        { icon: akryumAvatar, name: 'vue-apollo', category: 'Data' },
      ],
    }
  },
}
</script>

<style lang="stylus" scoped>
@import "~style/imports";

h1 {
  margin: 42px 0 12px;
  color: #444;
  font-weight: normal;
}

.hero {
  height: 160px;
  border-radius: 3px;
  background: $primary-color;
  position: relative;

  .hero-badge {
    position: absolute;
    top: 0;
    left: 0;
    border-top-left-radius: 3px;
    border-bottom-right-radius: 3px;
    background: white;
    padding: 4px;
    text-transform: uppercase;
    font-size: 10px;
    font-weight: bold;
  }

  .info {
    color: white;
    height: 100%;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: stretch;

    .label {
      flex: auto 1 1;
      font-size: 26px;
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: center;

      .category {
        margin-left: 6px;
        opacity: .7;
      }
    }

    .message {
      padding: 12px 20px;
      color: lighten(black, 10%);
      text-align: right;
      background: rgba(white, .7);

      a {
        color: black;
        display: inline-block;
        border-radius: 14px;
        background: white;
        padding: 4px 12px;

        &:not(:first-child) {
          margin-left: 12px;
        }

        &:not(:last-child) {
          margin-right: 12px;
        }
      }
    }
  }

  .avatar {
    background: white;
    padding: 4px;
  }
}

.avatar {
  $size =32px;
  width: $size;
  height: $size;
  border-radius: 3px;
  margin-right: 8px;
  vertical-align: middle;
}

.modules {
  display: flex;
  flex-direction: row;
  flex-flow: wrap;
  margin: -6px;
}

.module {
  border: solid 1px darken(white, 10%);
  border-radius: 3px;
  padding: 12px;
  box-sizing: border-box;
  min-width: 200px;
  flex: 30% 1 1;
  margin: 6px;

  .label {
    display: flex;
    align-items: center;
    width: 100%;
    line-height: 0.8em;

    .name {
      flex: auto 1 1;
    }

    .category {
      color: lighten(black, 50%);
    }
  }
}

</style>
