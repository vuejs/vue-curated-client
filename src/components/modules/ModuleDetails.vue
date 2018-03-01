<template>
  <div class="module-details page-content" :class="cssClass">
    <div class="fake-header"></div>
    <transition-group name="module-details">
      <div class="module-details" :key="id" @scroll="handleScroll">
        <template v-if="!loading">
          <div class="empty fill" v-if="!data">
            <div>
              <p>
                <VueIcon icon="cake"/>
                <span>If you were told there was a package here, that was a lie.</span>
              </p>
              <VueButton
                v-if="$responsive.mobile"
                :to="{ name: 'home' }"
                class="primary"
              >Explore other packages</VueButton>
            </div>
          </div>
          <template v-else>
            <section class="header">

              <downloads-graph class="header-graph" :module-id="id"></downloads-graph>

              <div class="header-content">

                <div class="toolbar">
                  <div class="back" v-if="$responsive.mobile">
                    <router-link :to="{ name: 'home' }"><VueIcon icon="arrow_back" class="big"/></router-link>
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
                      <VueIcon icon="star"/>
                    </a>

                    <a class="stat forks" :href="data.url + '/network'" v-tooltip="'Forks'">
                      {{ data.details.forks_count | shortenNumber }}
                      <VueIcon icon="call_split"/>
                    </a>

                    <a class="stat issues" :href="data.url + '/issues'" v-tooltip="'Open Issues'">
                      {{ data.details.open_issues_count | shortenNumber }}
                      <VueIcon icon="error_outline"/>
                    </a>
                  </span>
                </div>
              </div>

            </section>

            <VueTabs class="details-content" group-class="primary start" animate>
              <VueTab id="general" label="General" icon="assignment">
                <section v-if="data.details.description" class="catcher description">
                  <div class="text" v-html="$parseEmoji(data.details.description)"></div>
                </section>

                <section class="general-info">
                  <div id="links" class="links">
                    <a class="open-url" :href="data.url" target="_blank">
                      <VueIcon icon="open_in_new"/>
                      <span>repo</span>
                    </a>

                    <a class="open-url" :href="data.url + '/issues'" target="_blank">
                      <VueIcon icon="error_outline"/>
                      <span>issues</span>
                    </a>

                    <a class="open-url" v-if="data.details.has_wiki" :href="data.url + '/wiki'" target="_blank">
                      <VueIcon icon="import_contacts"/>
                      <span>wiki</span>
                    </a>

                    <a class="open-url" v-for="link of data.links" :href="link.url" target="_blank">
                      <VueIcon icon="public"/>
                      <span>{{ link.label }}</span>
                    </a>
                  </div>

                  <div id="times" class="times">
                    <span class="time info" v-tooltip="humanDate(data.details.updated_at)">
                      <VueIcon icon="update"/>
                      <span class="label">updated</span>
                      <span class="value">{{ data.details.updated_at | fromNow }}</span>
                    </span>
                    <span class="time info" v-tooltip="humanDate(data.details.pushed_at)">
                      <VueIcon icon="arrow_upward"/>
                      <span class="label">pushed</span>
                      <span class="value">{{ data.details.pushed_at | fromNow }}</span>
                    </span>
                    <span class="time info" v-tooltip="humanDate(data.details.created_at)">
                      <VueIcon icon="access_time"/>
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
              </VueTab>

              <VueTab id="releases" label="Releases" icon="local_offer">
                <a class="catcher tip" :href="`${data.url}/releases.atom`" target="_blank">
                  <VueIcon class="icon" icon="rss_feed"/>
                  <div class="text">
                    Subscribe to the releases feed!
                  </div>
                </a>

                <releases :module-id="id"></releases>
              </VueTab>
            </VueTabs>
          </template>
        </template>

        <VueLoadingIndicator
          v-if="loading"
          class="overlay primary big"
        />
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
@import "~style/imports";

.module-details {
  section {
    border: solid 1px darken(white, 5%);
    margin: 24px 0;
    padding: 24px;
    border-radius: 2px;

    .info {
      &:not(:last-child) {
        margin-right: 6px;
      }

      .label {
        margin-right 4px
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
    .vue-icon >>> svg {
      fill @color
    }

    &:hover {
      color: lighten($primary-color, 70%);
      .vue-icon >>> svg {
        fill @color
      }
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
      .vue-icon >>> svg {
        fill @color
      }
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
  margin 0
  border-radius: 2px;
  border: none;
  font-size: 20px;
  display: flex;
  align-items: flex-start;

  .icon {
    flex: auto 0 0;
    width 24px
    height @width
    margin-right: 12px;
    position: relative;
    top: 1px;
    >>> svg {
      fill @color
    }
  }

  .text {
    flex: auto 1 1;
  }

  &.tip {
    background: $md-deep-purple-500;
  }
}

.details-content
  opacity 0
  animation slide-to-bottom .3s .15s cubic-bezier(0.0, 0.0, 0.2, 1)
  animation-fill-mode forwards
  margin-top 12px
  >>> .tabs
    margin-left 24px
  >>> .vue-tab-content
    padding 24px


section.general-info {
  > div:not(:last-child) {
    margin-bottom: 24px;
  }
}

.links {
  a {
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
      flex-direction column

      .vue-icon {
        margin 0
      }
    }
  }
}

.times {
  .time {
    display: inline-flex;
    align-items center

    .vue-icon {
      margin-right 4px
    }

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
