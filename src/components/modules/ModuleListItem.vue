<template>
  <div class="module-list-item">
    <div class="module-header" @click="handleHeaderClick">
      <div class="avatar" v-if="details" v-tooltip="details.owner.login">
        <a :href="details.owner.html_url" target="_blank">
          <img :src="details.owner.avatar_url" />
        </a>
      </div>
      <div class="avatar" v-else>
        <div class="empty-avatar"></div>
      </div>

      <div class="content">
        <div class="general">
          <span class="label">
            <span class="module-label">{{ module.label }}</span>

            <span class="vue-versions">
              <span class="badge vue-version" v-for="version of module.vue">{{ version }}</span>
            </span>

            <span class="badge module-badge" v-if="module.badge" :class="module.badge">{{ module.badge }}</span>

            <a class="open-url" :href="module.url" target="_blank" v-tooltip="'Open repository'"><i class="material-icons">open_in_new</i></a>
          </span>

          <span class="details" v-if="details">
            <span class="stat stars" v-tooltip="'Stars'">
              {{ details.stargazers_count | shortenNumber }}
              <i class="material-icons">star</i>
            </span>

            <span class="stat forks" v-tooltip="'Forks'">
              {{ details.forks_count | shortenNumber }}
              <i class="material-icons">call_split</i>
            </span>

            <span class="stat issues" v-tooltip="'Open Issues'">
              {{ details.open_issues_count | shortenNumber }}
              <i class="material-icons">error_outline</i>
            </span>
          </span>
        </div>

        <div class="secondary">
          <span class="category">{{ module.category.label }}</span>
          <span class="description" v-if="details">{{ details.description }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    module: {
      type: Object,
    },
  },

  computed: {
    details () {
      return this.module.details
    },
  },

  methods: {
    handleHeaderClick (e) {
      let target = e.target
      // Prevent action if user clicked on a link
      while (target !== this.$el && target.parentElement && target.tagName !== 'A') {
        target = target.parentElement
      }
      if (target.tagName !== 'A') {
        this.$router.push({ name: 'module', params: { id: this.module.id } })
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
@import "~style/imports";

.module-list-item {
  cursor: default;
  position: relative;
  height: 90px;
  box-sizing: border-box;

  .module-header {
    padding: 22px 12px;
    display: flex;
    flex-direction: row;
    align-items: center;
    transition: background .15s;
    border-radius: 2px;

    &:hover {
      background: rgba(white, .9);
    }
  }

  .avatar {
    flex: auto 0 0;
    width: 32px;
    height: 32px;
    margin-right: 12px;

    img,
    .empty-avatar {
      background: white;
      width: 32px;
      height: 32px;
      border-radius: 3px;
    }
  }

  .content {
    flex: auto 0 1;
    width: 100%;
    overflow: hidden;

    > div {
      display: flex;
      flex-direction: row;

      &:not(:last-child) {
        margin-bottom: 6px;
      }
    }
  }

  .label {
    flex: 100% 1 1;
    ellipsis();
  }

  .module-label {
    margin-right: 6px;
  }

  .vue-versions {
    display: inline-block;

    .vue-version {
      background: lighten($primary-color, 15%);
      margin-right: 0;

      &:not(:last-child) {
        border-right: solid 1px white;
      }

      &:first-child {
        border-radius: 3px 0 0 3px;
      }

      &:last-child {
        border-radius: 0 3px 3px 0;
        background: $primary-color;
      }

      &:first-child:last-child {
        border-radius: 3px;
      }
    }
  }

  .module-badge {
    background: $md-orange-700;
  }

  .details,
  .secondary {
    color: darken(white, 30%);
  }

  .details {
    flex: auto 0 0;

    .stat {
      display: inline-block;
      width: 55px;
      text-align: right;

      @media ({$medium-screen}) {
        &:not(:first-child) {
          display: none;
        }
      }
    }

  }

  .secondary {
    display: flex;

    .category,
    .description {
      display: inline-block;
      box-sizing: border-box;
    }

    .category {
      padding-right: 12px;
      flex: auto 1 0;
      min-width: 50px;
    }

    .description {
      font-style: italic;
      text-align: right;
      flex: auto 1 1;
      min-width: 50px;
      max-width: 200px;
      ellipsis();

      @media ({$small-screen}) {
        display: none;
      }
    }
  }

  &.active {
    .module-header {
      background: rgba($primary-color, .1);
    }
  }
}
</style>
