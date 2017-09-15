<script>
export default {
  props: {
    to: {
      type: String
    },
    tag: {
      type: String,
      default: 'a'
    }
  },
  methods: {
    goto (to) {
      this.$veneer.push(to)
    }
  },
  render (h) {
    const {to, tag, goto} = this
    return h(tag, {
      attrs: {
        href: to
      },
      on: {
        click: e => {
          e.preventDefault()
          goto(to)
        }
      }
    }, this.$slots.default)
  }
}
</script>