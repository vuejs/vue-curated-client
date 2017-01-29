<template>
  <div class="module-owner">
    <a :href="data.html_url" target="_blank">
      <div class="header">
        <div class="avatar">
          <img :src="data.avatar_url" />
        </div>
        <div class="infos">
          <div class="login">{{ data.login }}</div>
          <div class="label">Owner</div>
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "~style/imports";

.header {
  h-box();
  align-items: center;
}

.avatar {
  width: 42px;
  height: 42px;
  margin-right: 24px;

  img,
  .empty-avatar {
    background: white;
    width: 100%;
    height: 100%;
    border-radius: 3px;
  }
}

.label {
  color: $md-grey-500;
}
</style>
