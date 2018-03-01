<template>
  <div class="releases">
    <VueSelect
      v-model="input"
      button-class="flat big"
    >
      <VueSelectButton
        v-for="option of options"
        :key="option.id"
        :value="option.id"
        :label="option.label"
        class="primary big"
      />
    </VueSelect>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

const defaultOption = { id: null, label: 'All Releases' }

export default {
  computed: {
    input: {
      get () {
        return (this.releases.find(r => r.id === this.currentRelease) || defaultOption).id
      },
      set (val) {
        this.setRelease(val)
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
