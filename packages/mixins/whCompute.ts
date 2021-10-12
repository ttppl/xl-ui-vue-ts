export default {
  props: {
    width: {
      type: [Number, String],
      default: 0
    },

    height: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    widthC ():string {
      if (isNaN(this.width)) {
        return this.width
      }
      if (this.width === 0) {
        return 'auto'
      } else if (this.width > 1) {
        return `${this.width}px`
      } else if (this.width < 1) {
        return `${this.width * 100}%`
      } else {
        return '100%'
      }
    },

    heightC ():string {
      if (isNaN(this.height)) {
        return this.height
      }
      if (this.height === 0) {
        return 'auto'
      } else if (this.height > 1) {
        return `${this.height}px`
      } else if (this.height < 1) {
        return `${this.height * 100}%`
      } else {
        return '100%'
      }
    }
  }
}
