<template>
  <div class="module-details page-content" :class="cssClass">
    <div class="fake-header"></div>
    <transition-group name="module-details">
      <div class="module-details" :key="id" @scroll="handleScroll">
        <template v-if="!loading">
          <div class="empty fill" v-if="!data">
            <div>
              <p>
                <i class="material-icons">cake</i>
                <span>If you were told there was a package here, that was a lie.</span>
              </p>
              <button v-if="$responsive.mobile" @click="$router.replace({ name: 'home' })">Explore other packages</button>
            </div>
          </div>
          <template v-else>
            <section class="header">

              <downloads-graph class="header-graph" :module-id="id"></downloads-graph>

              <div class="header-content">

                <div class="toolbar">
                  <div class="back" v-if="$responsive.mobile">
                    <router-link :to="{ name: 'home' }"><i class="material-icons">arrow_back</i></router-link>
                  </div>

                  <div class="title">
                    <span class="module-name" v-html="$parseEmoji(data.label)"></span>
                  </div>
                </div>

                <div class="secondary">
                  <span class="category">
                    <a v-tooltip="'Category'" @click="changeCategory">{{ data.category.label }}</a>
                  </span>

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
              </div>

            </section>

            <ui-tabs class="details-content">
              <ui-tab id="general" label="General" icon="assignment">
                <section v-if="data.details.description" class="catcher description">
                  <div class="text" v-html="$parseEmoji(data.details.description)"></div>
                </section>

                <section class="general-info">
                  <div id="links" class="links">
                    <a class="open-url" :href="data.url" target="_blank"><i class="material-icons">open_in_new</i> repo</a>

                    <a class="open-url" :href="data.url + '/issues'" target="_blank"><i class="material-icons">error_outline</i> issues</a>

                    <a class="open-url" v-if="data.details.has_wiki" :href="data.url + '/wiki'" target="_blank"><i class="material-icons">import_contacts</i> wiki</a>

                    <a class="open-url" v-for="link of data.links" :href="link.url" target="_blank"><i class="material-icons">public</i> {{ link.label }}</a>
                  </div>

                  <div id="times" class="times">
                    <span class="time info" v-tooltip="humanDate(data.details.updated_at)">
                      <i class="material-icons">update</i>
                      <span class="label">updated</span>
                      <span class="value">{{ data.details.updated_at | fromNow }}</span>
                    </span>
                    <span class="time info" v-tooltip="humanDate(data.details.pushed_at)">
                      <i class="material-icons">arrow_upward</i>
                      <span class="label">pushed</span>
                      <span class="value">{{ data.details.pushed_at | fromNow }}</span>
                    </span>
                    <span class="time info" v-tooltip="humanDate(data.details.created_at)">
                      <i class="material-icons">access_time</i>
                      <span class="label">created</span>
                      <span class="value">{{ data.details.created_at | fromNow }}</span>
                    </span>
                  </div>
                </section>

                <section id="owner">
                  <owner :data="data.details.owner"></owner>
                </section>

                <section id="readme">
                  <readme :id="id"></readme>
                </section>
              </ui-tab>

              <ui-tab id="releases" label="Releases" icon="local_offer">
                <a class="catcher tip" :href="`${data.url}/releases.atom`" target="_blank">
                  <i class="icon material-icons">rss_feed</i>
                  <div class="text">
                    Subscribe to the releases feed!
                  </div>
                </a>

                <releases :module-id="id"></releases>
              </ui-tab>
            </ui-tabs>
          </template>
        </template>

        <ui-loading-overlay :show="loading"></ui-loading-overlay>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { humanDate } from 'filters'

import DETAILS_QUERY from 'graphql/ModuleDetails.gql'

import Readme from './ModuleReadme.vue'
import DownloadsGraph from './DownloadsGraph.vue'
import Releases from './ModuleReleases.vue'
import Owner from './ModuleOwner.vue'

import ObserveScroll from 'mixins/ObserveScroll'

export default {
  mixins: [ObserveScroll],

  components: {
    Readme,
    DownloadsGraph,
    Releases,
    Owner,
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
      data: null,
    }
  },

  apollo: {
    data: {
      query: DETAILS_QUERY,
      variables () {
        return {
          id: this.id,
        }
      },
      update: ({ module }) => module,
      loadingKey: 'loading',
    },
  },

  computed: {
    cssClass () {
      return {
        scrolled: this.scrollTop !== 0,
      }
    },
  },

  methods: {
    changeCategory () {
      this.setCategory(this.data.category.id)
      if (window.innerWidth <= 800) {
        this.$router.push({ name: 'home' })
      }
    },

    humanDate,

    ...mapMutations({
      setCategory: 'set_category',
    }),
  },
}
</script>

<style lang="stylus">
.module-details {
  section {
    border: solid 1px darken(white, 5%);
    margin: 24px;
    padding: 24px;
    border-radius: 2px;

    .info {
      &:not(:last-child) {
        margin-right: 6px;
      }

      .label {
        color: $md-grey-500;
      }
    }
  }
}
</style>

<style lang="stylus" scoped>
@import "~style/imports";

.fake-header,
section.header {
  background: $primary-color;
}

.fake-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 144px;
}

.module-details {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background: white;
  z-index: 100;
}

section.header {
  color: white;
  margin: 0;
  padding: 0 24px;
  border: none;
  position: relative;
  border-radius: 0;

  @media ({$small-screen}) {
    padding: 0;
  }

  a {
    color: white;

    &:hover {
      color: lighten($primary-color, 70%);
    }
  }

  .toolbar {
    margin-bottom: 24px;
  }

  .title {
    text-align: center;
  }

  .secondary {
    display: flex;
    flex-direction: row;
    align-items: center;

    .category,
    .stats {
      flex: 100% 1 1;
    }

    .badges {
      flex: auto 0 0;
    }
  }

  .header-graph {
    $padding = 12px;
    position: absolute;
    top: $padding;
    bottom: $padding;
    left: 0;
    right: 0;
    z-index: 0;
  }

  .header-content {
    position: relative;
    z-index: 1;
    padding: 24px;
  }

  .back {
    position: absolute;
    top: 24px;
    left: 24px;
    font-size: 24px;

    a {
      color: white;
    }
  }
}

.module-name {
  font-size: 42px;
  font-weight: 300;

  @media ({$small-screen}) {
    font-size: 24px;
    font-weight: normal;
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
  text-align: right;

  .stat {
    display: inline-block;
    text-align: right;
    margin-left: 12px;

    @media ({$medium-screen}) {
      &:not(:first-child) {
        display: none;
      }
    }
  }

}

.catcher {
  display: block;
  text-decoration: none;
  background: $primary-color;
  color: white;
  padding: 24px;
  margin: 24px;
  margin-bottom: 0;
  border-radius: 2px;
  border: none;
  font-size: 20px;
  display: flex;
  align-items: flex-start;

  .icon {
    flex: auto 0 0;
    font-size: 24px;
    margin-right: 12px;
    position: relative;
    top: 1px;
  }

  .text {
    flex: auto 1 1;
  }

  &.tip {
    background: $md-deep-purple-500;
  }
}

.details-content {
  opacity: 0;
  animation: slide-to-bottom .3s .15s cubic-bezier(0.0, 0.0, 0.2, 1);
  animation-fill-mode: forwards;
}

section.general-info {
  > div:not(:last-child) {
    margin-bottom: 24px;
  }
}

.links {
  a {
    display: inline-block;

    &:not(:last-child) {
      margin-right: 12px;
    }
  }

  @media ({$small-screen}) {
    margin: -12px;
    margin-bottom: 12px !important;
    h-box();
    flex-wrap: wrap;

    a {
      flex: calc(33.33% - 24px) 0 0;
      padding: 12px;
      margin: 12px !important;
      box-sizing: border-box;
      text-align: center;

      i {
        display: block;
        margin: auto;
      }
    }
  }
}

.times {
  .time {
    display: inline-block;
    @media({$small-screen}) {
      display: block;
    }
  }
}

.module-details-enter-active,
.module-details-leave-active {
  transition: opacity .3s linear, transform .3s cubic-bezier(0.4, 0.0, 0.2, 1);
}

.module-details-enter,
.module-details-leave-active {
  opacity: 0;
}

.module-details-enter {
  transform: translateX(-30px);
}

.module-details-leave-active {
  transform: translateX(30px);
}

@keyframes slide-to-bottom {
  from {
    transform: translateY(-42px);
    opacity: 0;
  }
  to {
    transform: none;
    opacity: 1;
  }
}

.loading {
  position: absolute;
  left: 24px;
  right: 24px;
}

@media ({$small-screen}) {
  section.header {
    height: 123px;
    box-sizing: border-box;

    .toolbar,
    .back,
    .secondary,
    .header-graph {
      transition: all .15s cubic-bezier(0.0, 0.0, 0.2, 1);
    }

    .header-content {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      transition: padding .15s cubic-bezier(0.0, 0.0, 0.2, 1);
    }

    .secondary {
      overflow: hidden;
      box-sizing: border-box;
      max-height: 2em;
    }
  }

  .scrolled {
    section.header {
      .secondary,
      .header-graph {
        opacity: 0;
      }

      .secondary {
        max-height: 0;
        padding-top: 0;
        padding-bottom: 0;
      }

      .header-content {
        padding: 12px 24px;
        background: $primary-color;

        .toolbar {
          margin-bottom: 0;
        }

        .back {
          top: 12px;
        }
      }
    }
  }
}

</style>
