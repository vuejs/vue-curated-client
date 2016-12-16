<template>
  <div class="module-list-item">
    <div class="avatar" v-if="data" :title="data.details.owner.login">
      <a :href="data.details.owner.html_url" target="_blank">
        <img :src="data.details.owner.avatar_url" />
      </a>
    </div>

    <div class="content">
      <div class="general">
        <span class="label">
          {{ module.label }}
          <a :href="module.url" target="_blank"><i class="material-icons">open_in_new</i></a>
          <span class="vue-versions">
            <span class="vue-version" v-for="version of module.vueVersions">{{ version }}</span>
          </span>
        </span>

        <span class="details" v-if="data">
          <span class="stat stars" title="Stars">
            {{ data.details.stargazers_count | shortenNumber }}
            <i class="material-icons">star</i>
          </span>

          <span class="stat forks" title="Forks">
            {{ data.details.forks_count | shortenNumber }}
            <i class="material-icons">call_split</i>
          </span>

          <span class="stat issues" title="Open Issues">
            {{ data.details.open_issues_count | shortenNumber }}
            <i class="material-icons">error_outline</i>
          </span>
        </span>
      </div>

      <div class="secondary" v-if="data">
        <span class="category">{{ data.category.label }}</span>
        <span class="description">{{ data.details.description }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const detailsQuery = gql`query details($url: String!) {
  module(url: $url) {
    details {
      name
      description
      forks_count
      stargazers_count
      forks_count
      open_issues_count
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

export default {
  props: {
    module: {
      type: Object
    }
  },

  apollo: {
    data: {
      query: detailsQuery,
      variables () {
        return {
          url: this.module.url
        }
      },
      update ({ module }) {
        return module
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~style/imports";

.module-list-item {
  padding: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;

  &:not(:last-child) {
    border-bottom: solid 1px darken(white, 5%);
  }

  .avatar {
    flex: auto 0 0;
    width: 32px;
    height: 32px;
    margin-right: 12px;

    img {
      max-width: 32px;
      max-height: 32px;
      border-radius: 3px;
    }
  }

  .content {
    flex: 100% 1 1;

    > div {
      display: flex;
      flex-direction: row;
      margin: 4px 0;
    }
  }

  .label {
    flex: 100% 1 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    .vue-versions {
      margin-left: 12px;
      font-size: 10px;
      display: inline-block;
      vertical-align: text-top;
      color: white;

      .vue-version {
        display: inline-block;
        padding: 2px 4px;
        background: lighten($primary-color, 25%);
        border-radius: 3px;

        &:not(:last-child) {
          border-right: solid 1px white;
        }

        &:first-child {
          border-radius: 3px 0 0 3px;
        }

        &:last-child {
          border-radius: 0 3px 3px 0;
          background: lighten($primary-color, 10%);
        }

        &:first-child:last-child {
          border-radius: 3px;
        }
      }
    }
  }

  .secondary {
    color: darken(white, 30%);
  }

  .details {
    flex: auto 0 0;

    .stat {
      display: inline-block;
      width: 70px;
      text-align: right;
    }
  }

  .secondary {
    .category {
      margin-right: 12px;
    }

    .description {
      font-style: italic;
      text-align: right;
      flex: auto 1 1;
    }
  }

  &:hover {
    background: rgba($primary-color, .1);
  }
}
</style>
