<template>
  <div class="ui-drop" role="dialog" tabindex="-1" @keydown.esc="closeDrop" ref="dropdown">
    <slot></slot>
  </div>
</template>

<script>
import Drop from 'tether-drop'

export default {
  name: 'ui-drop',

  props: {
    id: String,
    trigger: {},
    show: {
      type: Boolean,
      default: false,
    },
    dropPosition: {
      type: String,
      default: 'bottom left',
    },
    openOn: {
      type: String,
      default: 'click', // 'click', 'hover', 'focus', 'always', null
    },
    classes: {
      type: String,
      default: '',
    },
    exclusiveFocus: {
      type: Boolean,
      default: false,
    },
  },

  data () {
    return {
      drop: null,
      lastFocussedElement: null,
    }
  },

  watch: {
    trigger (val) {
      this.updateTrigger(this.trigger)
    },

    show (val) {
      if (val) {
        this.openDrop()
      } else {
        this.closeDrop()
      }
    },
  },

  mounted () {
    if (this.trigger) {
      this.updateTrigger(this.trigger)
      this.initializeDropdown()
    }
  },

  beforeDestroy () {
    if (this.drop) {
      this.drop.remove()
      this.drop.destroy()
    }
  },

  methods: {
    updateTrigger (value) {
      if (typeof value === 'string') {
        this.triggerEl = document.querySelector(value)
      } else if (typeof value === 'function') {
        this.updateTrigger(value())
      } else {
        this.triggerEl = value
      }
    },

    initializeDropdown () {
      this.drop = new Drop({
        target: this.triggerEl,
        content: this.$el,
        position: this.dropPosition,
        constrainToWindow: true,
        constrainToScrollParent: false,
        openOn: this.openOn,
        classes: this.classes,
        tetherOptions: {
          constraints: [
            {
              to: 'window',
              attachment: 'together',
              pin: true,
            },
          ],
        },
      })

      // TO FIX: Hacky workaround for Tether not positioning
      // correctly for positions other than 'bottom left'
      if (this.dropPosition !== 'bottom left') {
        this.drop.open()
        this.drop.close()
        this.drop.open()
        this.drop.close()
      }

      this.drop.on('open', this.positionDrop)
      this.drop.on('open', this.dropOpened)
      this.drop.on('close', this.dropClosed)
    },

    openDrop () {
      if (this.drop) {
        this.drop.open()
      }
    },

    /**
     * Ensures drop is horizontally within viewport (vertical is already solved by drop.js).
     * https://github.com/HubSpot/drop/issues/16
     */
    positionDrop () {
      const drop = this.drop
      const windowWidth = window.innerWidth ||
        document.documentElement.clientWidth ||
        document.body.clientWidth

      let dropWidth = drop.drop.getBoundingClientRect().width
      let left = drop.target.getBoundingClientRect().left
      let availableSpace = windowWidth - left

      if (dropWidth > availableSpace) {
        let direction = dropWidth > availableSpace ? 'right' : 'left'

        drop.tether.attachment.left = direction
        drop.tether.targetAttachment.left = direction

        drop.position()
      }
    },

    closeDrop () {
      if (this.drop) {
        this.drop.close()
      }
    },

    toggleDrop (e) {
      if (this.drop) {
        this.drop.toggle(e)
      }
    },

    dropOpened () {
      this.triggerEl.classList.add('drop-open')

      this.lastFocussedElement = document.activeElement
      this.$el.focus()

      this.$emit('open')
      this.$emit('show', true)

      if (this.exclusiveFocus) {
        document.addEventListener('focus', this.restrictFocus, true)
      }
    },

    dropClosed () {
      this.triggerEl.classList.remove('drop-open')

      if (this.lastFocussedElement) {
        this.lastFocussedElement.focus()
      }

      this.$emit('close')
      this.$emit('show', false)

      if (this.exclusiveFocus) {
        document.removeEventListener('focus', this.restrictFocus, true)
      }
    },

    restrictFocus (e) {
      if (this.exclusiveFocus && !this.$el.contains(e.target)) {
        e.stopPropagation()
        this.$el.focus()
      }
    },
  },
}
</script>

<style lang="stylus">
.drop-element {
  position: absolute;
  visibility: hidden;
  z-index: 10000;
  max-width: 100%;
  max-height: 100%;
  transition: opacity .15s ease, visibility .15s;
  opacity: 0;
  pointer-events: none;

  .drop-content {
    transition: transform .15s;
    transform: translateY(-4px);
  }

  &,
  & *,
  & *:after,
  & *:before,
  &:after,
  &:before {
    box-sizing: border-box;
    outline: none;
  }

  &.drop-open {
    pointer-events: all;
    visibility: visible;

    .drop-content {
      transform: none;
    }
  }

  &.drop-after-open {
    opacity: 1;
  }
}
</style>
