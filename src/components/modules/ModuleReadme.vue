<template>
  <div class="readme" :class="cssClasses">
    <transition name="fade" mode="out-in">
      <div class="content markdown" v-if="!loading" key="html" v-html="renderedHTML"></div>
      <div class="loading" v-else key="loading">
        <ui-loading-animation></ui-loading-animation>
      </div>
    </transition>

    <transition name="fade">
      <div class="actions" v-if="!loading">
        <button @click="showFull = !showFull">{{ showFull ? 'Hide full Readme' : 'Show full Readme' }}</button>
      </div>
    </transition>
  </div>
</template>

<script>
import marked from 'marked'

import README_QUERY from 'graphql/ModuleReadme.gql'

export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data () {
    return {
      showFull: false,
      loading: 0,
    }
  },

  apollo: {
    readme: {
      query: README_QUERY,
      variables () {
        return {
          id: this.id,
        }
      },
      update: ({ module }) => module.readme,
      loadingKey: 'loading',
    },
  },

  computed: {
    cssClasses () {
      return {
        preview: !this.showFull,
      }
    },

    renderedHTML () {
      if (this.readme) {
        return this.$parseEmoji(marked(this.readme.content))
      }
    },
  },

  watch: {
    id () {
      this.showFull = false
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "~style/imports";

.preview {
  .content {
    max-height: 300px;
    overflow: hidden;
    position: relative;

    &:after {
      content: '';
      display: block;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 100px;
      background: linear-gradient(to bottom,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%);
    }
  }
}

.actions {
  margin-top: 12px;
  text-align: center;
}

.loading {
  width: 134px;
  margin: auto;
}
</style>
