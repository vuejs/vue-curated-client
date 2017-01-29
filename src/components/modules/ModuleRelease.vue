<template>
  <section class="module-release">
    <div class="header">
      <div class="dates">
        <span v-tooltip="humanDate(data.published_at)"><i class="material-icons">access_time</i> {{ data.published_at | fromNow }}</span>
      </div>
      <div class="title">
        <a class="tag-name" :href="data.html_url" target="_blank">{{ data.tag_name }}</a>
        <span class="badge" v-if="data.prerelease">pre-release</span>
      </div>
    </div>
    <div class="body">
      <div class="description markdown" v-html="renderedHTML"></div>
    </div>
  </section>
</template>

<script>
import marked from 'marked'
import { humanDate } from 'filters'

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },

  computed: {
    renderedHTML () {
      if (this.data) {
        return marked(this.data.body)
      }
    },
  },

  methods: {
    humanDate,
  },
}
</script>

<style lang="stylus" scoped>
@import "~style/imports";

.tag-name {
  font-size: 32px;
  font-weight: lighter;
  margin-right: 12px;
}

.badge {
  background: $md-purple-500;
}
</style>
