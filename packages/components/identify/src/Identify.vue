<template>
  <div class="XlIdentify" @click.stop="reset">
    <canvas id="xl-canvas" :width="contentWidth" :height="contentHeight" />
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'XlIdentify',
  props: {
    modelValue: { // 验证码
      type: String,
      default: ''
    },

    fontSizeMin: { // 字体大小
      type: Number,
      default: 40
    },

    fontSizeMax: {
      type: Number,
      default: 40
    },

    backgroundColorMin: { // 背景颜色
      type: Number,
      default: 255
    },

    backgroundColorMax: {
      type: Number,
      default: 255
    },

    colorMin: { // 字体颜色
      type: Number,
      default: 50
    },

    colorMax: {
      type: Number,
      default: 160
    },

    lineColorMin: { // 干扰线颜色
      type: Number,
      default: 40
    },

    lineColorMax: {
      type: Number,
      default: 180
    },

    dotColorMin: { // 干扰点颜色
      type: Number,
      default: 0
    },

    dotColorMax: {
      type: Number,
      default: 255
    },

    contentWidth: { // 宽
      type: Number,
      default: 112
    },

    contentHeight: { // 高
      type: Number,
      default: 38
    }
  },

  emits: ['update:identifyCode'],
  computed: {
    identifyCode: {
      get () {
        return this.modelValue
      },

      set (nv) {
        this.$emit('update:modelValue', nv)
      }
    }
  },

  watch: {
    identifyCode () {
      this.drawPic()
    }
  },

  mounted () {
    this.drawPic()
  },

  methods: {
    reset () {
      this.identifyCode = this.randomNum(1000, 9999).toString()
      this.drawPic()
    },

    // 生成一个随机数
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },

    // 生成一个随机的颜色
    randomColor (min, max) {
      const r = this.randomNum(min, max)
      const g = this.randomNum(min, max)
      const b = this.randomNum(min, max)
      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },

    drawPic () {
      const canvas = document.getElementById('xl-canvas')
      const ctx = canvas.getContext('2d')
      ctx.textBaseline = 'bottom'
      // 绘制背景
      ctx.fillStyle = this.randomColor(this.backgroundColorMin, this.backgroundColorMax)
      ctx.fillRect(0, 0, this.contentWidth, this.contentHeight)
      // 绘制文字
      if (this.identifyCode === '') {
        // this.identifyCode = this.randomNum(1000, 9999)
        const tmp = this.randomNum(1000, 9999).toString()
        // Bus.$emit('identify-code', tmp)
        this.identifyCode = tmp
        for (let i = 0; i < tmp.length; i++) {
          this.drawText(ctx, tmp, tmp[i], i)
        }
      } else {
        for (let i = 0; i < this.identifyCode.length; i++) {
          this.drawText(ctx, this.identifyCode, this.identifyCode[i], i)
        }
      }
      this.drawLine(ctx)
      this.drawDot(ctx)
    },

    drawText (ctx, full, txt, i) {
      ctx.fillStyle = this.randomColor(this.colorMin, this.colorMax)
      ctx.font = this.randomNum(this.fontSizeMin, this.fontSizeMax) + 'px SimHei'
      const x = (i + 1) * (this.contentWidth / (full.length + 1))
      const y = this.randomNum(this.fontSizeMax, this.contentHeight - 5)
      var deg = this.randomNum(-45, 45)
      // 修改坐标原点和旋转角度
      ctx.translate(x, y)
      ctx.rotate(deg * Math.PI / 180)
      ctx.fillText(txt, 0, 0)
      // 恢复坐标原点和旋转角度
      ctx.rotate(-deg * Math.PI / 180)
      ctx.translate(-x, -y)
    },

    drawLine (ctx) {
      // 绘制干扰线
      for (let i = 0; i < 8; i++) {
        ctx.strokeStyle = this.randomColor(this.lineColorMin, this.lineColorMax)
        ctx.beginPath()
        ctx.moveTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
        ctx.lineTo(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight))
        ctx.stroke()
      }
    },

    drawDot (ctx) {
      // 绘制干扰点
      for (let i = 0; i < 100; i++) {
        ctx.fillStyle = this.randomColor(this.dotColorMin, this.dotColorMax)
        ctx.beginPath()
        ctx.arc(this.randomNum(0, this.contentWidth), this.randomNum(0, this.contentHeight), 1, 0, 2 * Math.PI)
        ctx.fill()
      }
    }
  }
}
</script>

<style lang="less">
.XlIdentify{
  cursor: pointer;
}
</style>
