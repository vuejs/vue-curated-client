<template>
  <div class="graph">
    <svg width="100%" height="100%">
      <defs>
        <linearGradient :id="`svg-graph-linear-gradient${_uid}`" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" :stop-color="fill.start"/>
          <stop offset="100%" :stop-color="fill.end"/>
        </linearGradient>
      </defs>
      <path :d="path" :style="style"/>
    </svg>

    <resize-observer @notify="handleResize" />
  </div>
</template>

<script>
import { getSplineCurves } from 'utils/graph'

function point (op, ...coords) {
  let points = ''
  for (let i = 0; i < coords.length; i++) {
    points += coords[i] + (i % 2 === 0 ? ',' : ' ')
  }
  return `${op} ${points}`
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
      type: Object,
      default: () => ({ start: '#3baa7a', end: '#40b883' }),
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
      return `stroke: ${this.stroke}; fill: url(#svg-graph-linear-gradient${this._uid});`
    },

    maxValue () {
      let maxValue = 0
      this.values.forEach(value => {
        if (value > maxValue) {
          maxValue = value
        }
      })
      return maxValue
    },

    points () {
      const segmentWidth = this.width / (this.values.length - 1)
      let x = 0
      const points = []
      this.values.forEach(value => {
        const y = (1 - value / this.maxValue) * this.height
        points.push({ x, y })
        x += segmentWidth
      })
      return points
    },

    path () {
      const w = this.width
      const h = this.height

      let path = point('M', 0, h)
      getSplineCurves(this.points, 0, h, 0.5).forEach(coords => {
        path += point('C', ...coords)
      })
      path += point('L', w, h)
      return path
    },
  },

  methods: {
    handleResize () {
      this.$nextTick(() => {
        this.width = this.$el.clientWidth
        this.height = this.$el.clientHeight
      })
    },
  },

  mounted () {
    this.handleResize()
  },
}
</script>
