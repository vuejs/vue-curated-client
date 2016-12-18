<template>
  <module-details :id="$route.params.id"></module-details>
</template>

<script>
import ModuleDetails from '../modules/ModuleDetails.vue'

export default {
  components: {
    ModuleDetails
  }
}
</script>
