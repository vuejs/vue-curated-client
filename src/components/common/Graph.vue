<template>
  <div class="graph">
    <svg width="100%" height="100%">
      <defs>
        <linearGradient id="linear" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" :stop-color="fill"/>
          <stop offset="100%" stop-color="#40b883"/>
        </linearGradient>
      </defs>

      <path :d="d" :style="style"/>
    </svg>

    <resize-observer @notify="handleResize" />
  </div>
</template>

<script>
function point (op, x, y) {
  return `${op} ${x},${y} `
}

export default {
  props: {
    values: {
      type: Array,
      required: true,
    },
    stroke: {
      type: String,
      default: '#3baa7a',
    },
    fill: {
      type: String,
      default: '#3baa7a',
    },
  },

  data () {
    return {
      width: 500,
      height: 200,
    }
  },

  computed: {
    style () {
      return `stroke: ${this.stroke}; fill: url(#linear);`
    },

    d () {
      const w = this.width
      const h = this.height

      const segmentWidth = w / (this.values.length - 1)

      let maxValue = 0
      this.values.forEach(value => {
        if (value > maxValue) {
          maxValue = value
        }
      })

      let path = point('M', 0, h)
      let position = 0
      this.values.forEach(value => {
        path += point('L', position, (1 - value / maxValue) * h)
        position += segmentWidth
      })
      path += point('L', w, h)
      path += 'Z'
      return path
    },
  },

  methods: {
    handleResize () {
      this.width = this.$el.clientWidth
      this.height = this.$el.clientHeight
    },
  },

  mounted () {
    this.$nextTick(this.handleResize)
  },
}
</script>
