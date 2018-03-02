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

            <span class="badges">
              <span class="badge-group vue-versions">
                <span class="badge vue-version" v-for="version of module.vue">{{ version }}</span>
              </span>

              <span class="badge module-badge" v-if="module.badge" :class="module.badge">{{ module.badge }}</span>

              <span class="badge new-badge" v-if="isNew">new</span>
              <span class="badge updated-badge" v-else-if="isUpdated" v-tooltip="updatedTooltip">
                <VueIcon icon="cached" class="small"/>
              </span>
            </span>

            <a class="open-url" :href="module.url" target="_blank" v-tooltip="'Open repository'">
              <VueIcon icon="open_in_new"/>
            </a>
          </span>

          <span class="details" v-if="details">
            <span class="stat stars" v-tooltip="'Stars'">
              {{ details.stargazers_count | shortenNumber }}
              <VueIcon icon="star"/>
            </span>

            <span class="stat forks" v-tooltip="'Forks'">
              {{ details.forks_count | shortenNumber }}
              <VueIcon icon="call_split"/>
            </span>

            <span class="stat issues" v-tooltip="'Open Issues'">
              {{ details.open_issues_count | shortenNumber }}
              <VueIcon icon="error_outline"/>
            </span>
          </span>
        </div>

        <div class="secondary">
          <span class="category">{{ module.category.label }}</span>
          <span
            v-if="details && details.description"
            class="description"
            v-html="$parseEmoji(details.description)"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { fromNow } from 'filters'

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

    isNew () {
      const limit = moment().subtract(1, 'months')
      return moment(this.details.created_at).isAfter(limit)
    },

    isUpdated () {
      const limit = moment().subtract(3, 'days')
      return moment(this.details.pushed_at).isAfter(limit)
    },

    updatedTooltip () {
      return `Pushed ${fromNow(this.details.pushed_at)}`
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
      align-items center

      &:not(:last-child) {
        margin-bottom: 6px;
      }
    }
  }

  .label {
    flex: 100% 1 1;
    display inline-flex
    align-items center
    ellipsis()
  }

  .open-url {
    margin-left 2px
  }

  .module-label {
    margin-right: 6px;
  }

  .badges {
    vertical-align: bottom;
  }

  .vue-versions {
    .vue-version {
      background: lighten($primary-color, 15%);

      &:last-child {
        background: $primary-color;
      }
    }
  }

  .module-badge {
    background: $md-orange-700;
  }

  .new-badge {
    background: $md-purple-500;
  }

  .updated-badge {
    background: $md-deep-purple-500;
  }

  .details,
  .secondary {
    color: lighten($vue-color-dark, 60%);

    .vue-icon {
      >>> svg {
        fill @color
      }
    }
  }

  .details {
    flex: auto 0 0;

    .stat {
      display: inline-flex;
      align-items center
      justify-content flex-end
      width: 55px;

      .vue-icon {
        margin-left 2px
      }

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
