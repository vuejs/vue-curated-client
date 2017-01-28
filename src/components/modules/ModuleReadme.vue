<template>
  <div class="readme" :class="cssClasses">
    <transition name="fade" mode="out-in">
      <div class="content markdown" v-if="ready" key="html" v-html="renderedHTML"></div>
      <div class="loading" v-else key="loading">
        <ui-loading-animation></ui-loading-animation>
      </div>
    </transition>

    <div class="actions">
      <button @click="showFull = !showFull">{{ showFull ? 'Hide full Readme' : 'Show full Readme' }}</button>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import marked from 'marked'

const readmeQuery = gql`query details($id: String!) {
  module (id: $id) {
    readme {
      content
    }
  }
}`

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
      query: readmeQuery,
      variables () {
        return {
          id: this.id,
        }
      },
      update: ({ module }) => module.readme,
      loadingKey: 'loading',
      returnPartialData: true,
    },
  },

  computed: {
    cssClasses () {
      return {
        preview: !this.showFull,
      }
    },

    ready () {
      return this.readme
    },

    renderedHTML () {
      if (this.readme) {
        return marked(this.readme.content)
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
