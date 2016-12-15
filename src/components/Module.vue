<template>
  <div class="module">
    <span class="label">{{ data.label }}</span>
    <a :href="data.url">repo</a>
    <span class="stars">{{ data.stars }} <i class="material-icons">star</i></span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object
    }
  }
}
</script>
