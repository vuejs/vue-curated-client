<template>
  <div class="readme" :class="cssClasses">
    <div class="content markdown" v-if="readme" v-html="renderedHTML"></div>

    <div class="actions">
      <button @click="showFull = !showFull">{{ showFull ? 'Hide full Readme' : 'Show full Readme' }}</button>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import marked from 'marked'

const readmeQuery = gql`query readme($id: String!) {
  module(id: $id) {
    readme {
      content
    }
  }
}`

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },

  data () {
    return {
      showFull: false
    }
  },

  apollo: {
    readme: {
      query: readmeQuery,
      variables () {
        return {
          id: this.id
        }
      },
      update: ({ module }) => module.readme
    }
  },

  computed: {
    cssClasses () {
      return {
        preview: !this.showFull
      }
    },

    renderedHTML () {
      if (this.readme) {
        return marked(this.readme.content)
      }
    }
  },

  watch: {
    id () {
      this.showFull = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~style/imports";

.readme {
  border: solid 1px darken(white, 5%);
  margin: 24px 0;
  padding: 24px;
  border-radius: 2px;
}

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
      /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#ffffff+0,ffffff+100&0+0,1+100 */
      background: -moz-linear-gradient(top,  rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%); /* FF3.6-15 */
      background: -webkit-linear-gradient(top,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(to bottom,  rgba(255,255,255,0) 0%,rgba(255,255,255,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 ); /* IE6-9 */
    }
  }
}

.actions {
  margin-top: 12px;
  text-align: center;
}
</style>
