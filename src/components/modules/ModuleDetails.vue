<template>
  <div>
    <div class="fake-header"></div>
    <transition-group name="fade" mode="in-out">
      <div class="module-details" :key="id">
        <template v-if="data">
          <section class="header">
            <div class="title">
              <span class="module-name">{{ data.label }}</span>

              <span class="badges">
                <span class="badge vue-version" v-for="version of data.vue">
                  <span class="badge-label">vue</span>
                  {{ version }}
                </span>

                <span class="badge module-badge" v-if="data.badge" :class="data.badge">{{ data.badge }}</span>
              </span>

              <span class="stats">
                <a class="stat stars" :href="data.url + '/stargazers'" v-tooltip="'Stars'">
                  {{ data.details.stargazers_count | shortenNumber }}
                  <i class="material-icons">star</i>
                </a>

                <a class="stat forks" :href="data.url + '/network'" v-tooltip="'Forks'">
                  {{ data.details.forks_count | shortenNumber }}
                  <i class="material-icons">call_split</i>
                </a>

                <a class="stat issues" :href="data.url + '/issues'" v-tooltip="'Open Issues'">
                  {{ data.details.open_issues_count | shortenNumber }}
                  <i class="material-icons">error_outline</i>
                </a>
              </span>
            </div>

            <div class="secondary">
              <span class="category">{{ data.category.label }}</span>
              <span class="description">{{ data.details.description }}</span>
            </div>

          </section>

          <section class="details-content">
            <div class="links">
              <a class="open-url" :href="data.url" target="_blank"><i class="material-icons">open_in_new</i> repo</a>

              <a class="open-url" :href="data.url + '/issues'" target="_blank"><i class="material-icons">error_outline</i> issues</a>

              <a class="open-url" v-if="data.details.has_wiki" :href="data.url + '/wiki'" target="_blank"><i class="material-icons">import_contacts</i> wiki</a>

              <a class="open-url" v-for="link of data.links" :href="link.url" target="_blank"><i class="material-icons">public</i> {{ link.label }}</a>
            </div>

            <div class="times">

              <span class="time info">
                <i class="material-icons">update</i>
                <span class="label">updated</span>
                <span class="value">{{data.details.updated_at | humanDate }}</span>
              </span>
              <span class="time info">
                <i class="material-icons">arrow_upward</i>
                <span class="label">pushed</span>
                <span class="value">{{data.details.pushed_at | humanDate }}</span>
              </span>
              <span class="time info">
                <i class="material-icons">access_time</i>
                <span class="label">created</span>
                <span class="value">{{data.details.created_at | humanDate }}</span>
              </span>
            </div>

            <readme :id="id"></readme>
          </section>
        </template>

        <ui-loading-overlay :show="loading"></ui-loading-overlay>
      </div>
    </transition-group>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import { moduleFields } from 'api/data'

const detailsQuery = gql`query details($id: String!) {
  module(id: $id) {
    ${moduleFields}
    details {
      name
      description
      forks_count
      stargazers_count
      forks_count
      open_issues_count
      has_wiki
      created_at
      pushed_at
      updated_at
      owner {
        login
        avatar_url
        html_url
      }
    }
    category {
      id
      label
    }
  }
}`

import Readme from './Readme.vue'

export default {
  components: {
    Readme,
  },

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  data () {
    return {
      loading: 0,
    }
  },

  apollo: {
    data: {
      query: detailsQuery,
      variables () {
        return {
          id: this.id,
        }
      },
      update: ({ module }) => module,
      loadingKey: 'loading',
    },
  },
}
</script>

<style lang="scss" scoped>
@import "~style/imports";

.fake-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 120px;
  background: $primary-color;
}

.module-details {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

section {
  margin: 0;
  padding: 24px;
}

.header {
  background: $primary-color;
  color: white;
  padding: 12px 24px 24px;

  a {
    color: white;

    &:hover {
      color: lighten($primary-color, 40%);
    }
  }

  .title {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
  }

  .badges {
    flex: auto 1 1;
    display: inline-flex;
  }

  .secondary {
    display: flex;
    color: lighten($primary-color, 40%);

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
      @include ellipsis;

      @media #{$small-screen} {
        display: none;
      }
    }
  }
}

.module-name {
  font-size: 32px;
  font-weight: 300;
  margin-right: 12px;
}

.badge {
  display: inline-block;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 12px;
  color: white;
  background: grey;
  vertical-align: text-top;

  &:not(:last-child) {
    margin-right: 4px;
  }
}

.vue-version {
  color: $primary-color;
  background: white;
}

.module-badge {
  background: $md-orange-700;
}

.stats {
  flex: auto 0 0;

  .stat {
    display: inline-block;
    width: 55px;
    text-align: right;

    @media #{$medium-screen} {
      &:not(:first-child) {
        display: none;
      }
    }
  }

}

.details-content {
  > div {
    margin-bottom: 24px;
  }

  .info {
    &:not(:last-child) {
      margin-right: 6px;
    }

    .label {
      color: $md-grey-500;
    }
  }
}

.links {
  a {
    display: inline-block;

    &:not(:last-child) {
      margin-right: 12px;
    }
  }
}

</style>
