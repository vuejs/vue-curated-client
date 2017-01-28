<template>
  <div class="releases">
    <ui-select v-model="input" :options="options"></ui-select>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

const defaultOption = { id: null, label: 'All Releases' }

export default {
  computed: {
    input: {
      get () {
        return this.releases.find(r => r.id === this.currentRelease) || defaultOption
      },
      set (val) {
        this.setRelease(val.id)
      },
    },

    options () {
      return [
        defaultOption,
        ...this.releases,
      ]
    },

    ...mapGetters({
      releases: 'releases',
      currentRelease: 'releaseId',
    }),
  },

  methods: {
    ...mapMutations({
      setRelease: 'set_release',
    }),
  },
}
</script>
