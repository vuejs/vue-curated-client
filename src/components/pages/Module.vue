<template>
  <module-details class="page-content" :id="$route.params.id"></module-details>
</template>

<script>
import ModuleDetails from '../modules/ModuleDetails.vue'

export default {
  name: 'module',

  components: {
    ModuleDetails,
  },
}
</script>
