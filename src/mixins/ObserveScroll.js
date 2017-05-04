export default {
  data () {
    return {
      scrollTop: 0,
    }
  },

  methods: {
    handleScroll (event) {
      this.scrollTop = event.currentTarget.scrollTop
    },
  },
}
