<template>
  <div :class="wrapClasses">
    <div class="upHandler">
      <a
        @click="up"
        @mousedown="preventDefault"
        :class="upClasses">
        <div style="margin-top: 22px; font-size: 22px;" @click="preventDefault">+</div>
      </a>
      <!--<a-->
      <!--@click="down"-->
      <!--@mousedown="preventDefault"-->
      <!--:class="downClasses">-->
      <!--<span :class="innerDownClasses" @click="preventDefault"></span>-->
      <!--</a>-->
    </div>
    <div class="downHandler">
      <a
        @click="down"
        @mousedown="preventDefault"
        :class="downClasses">
        <div style="margin-top: 22px; font-size: 22px;" @click="preventDefault">-</div>
      </a>
    </div>
    <div :class="inputWrapClasses">
      <input
        :id="elementId"
        :class="inputClasses"
        :disabled="disabled"
        autocomplete="off"
        spellcheck="false"
        :autofocus="autofocus"
        @focus="focus"
        @blur="blur"
        @keydown.stop="keyDown"
        @input="change"
        @mouseup="preventDefault"
        @change="change"
        :readonly="readonly || !editable"
        :name="name"
        :value="formatterValue"
        :placeholder="placeholder">
    </div>
  </div>
</template>
<script>
  const prefixCls = 'ivu-input-number'
  const iconPrefixCls = 'ivu-icon'

  function broadcast(componentName, eventName, params) {
    this.$children.forEach(child => {
      const name = child.$options.name

      if (name === componentName) {
        child.$emit.apply(child, [eventName].concat(params))
      } else {
        // todo 如果 params 是空数组，接收到的会是 undefined
        broadcast.apply(child, [componentName, eventName].concat([params]))
      }
    })
  }

  const Emitter = {
    methods: {
      dispatch(componentName, eventName, params) {
        let parent = this.$parent || this.$root
        let name = parent.$options.name

        while (parent && (!name || name !== componentName)) {
          parent = parent.$parent

          if (parent) {
            name = parent.$options.name
          }
        }
        if (parent) {
          parent.$emit.apply(parent, [eventName].concat(params))
        }
      },
      broadcast(componentName, eventName, params) {
        broadcast.call(this, componentName, eventName, params)
      }
    }
  }

  function oneOf(value, validList) {
    for (let i = 0; i < validList.length; i++) {
      if (value === validList[i]) {
        return true
      }
    }
    return false
  }

  function addNum(num1, num2) {
    let sq1, sq2, m
    try {
      sq1 = num1.toString().split('.')[1].length
    }
    catch (e) {
      sq1 = 0
    }
    try {
      sq2 = num2.toString().split('.')[1].length
    }
    catch (e) {
      sq2 = 0
    }
//        if (sq1 === 0 || sq2 === 0) {
//            return num1 + num2;
//        } else {
//            m = Math.pow(10, Math.max(sq1, sq2));
//            return (num1 * m + num2 * m) / m;
//        }
    m = Math.pow(10, Math.max(sq1, sq2))
    return (Math.round(num1 * m) + Math.round(num2 * m)) / m
  }

  export default {
    name: 'InputNumberAlter',
    mixins: [Emitter],
    props: {
      max: {
        type: Number,
        default: Infinity
      },
      min: {
        type: Number,
        default: -Infinity
      },
      step: {
        type: Number,
        default: 1
      },
      value: {
        type: Number,
        default: 1
      },
      size: {
        validator(value) {
          return oneOf(value, ['small', 'large', 'default'])
        },
        default() {
          return !this.$IVIEW || this.$IVIEW.size === '' ? 'default' : this.$IVIEW.size
        }
      },
      disabled: {
        type: Boolean,
        default: false
      },
      autofocus: {
        type: Boolean,
        default: false
      },
      readonly: {
        type: Boolean,
        default: false
      },
      editable: {
        type: Boolean,
        default: true
      },
      name: {
        type: String
      },
      precision: {
        type: Number
      },
      elementId: {
        type: String
      },
      formatter: {
        type: Function
      },
      parser: {
        type: Function
      },
      placeholder: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        focused: false,
        upDisabled: false,
        downDisabled: false,
        currentValue: this.value
      }
    },
    computed: {
      wrapClasses() {
        return [
          `${prefixCls}`,
          {
            [`${prefixCls}-${this.size}`]: !!this.size,
            [`${prefixCls}-disabled`]: this.disabled,
            [`${prefixCls}-focused`]: this.focused
          }
        ]
      },
      handlerClasses() {
        return `${prefixCls}-handler-wrap`
      },
      upClasses() {
        return [
          `${prefixCls}-handler`,
          `${prefixCls}-handler-up`,
          {
            [`${prefixCls}-handler-up-disabled`]: this.upDisabled
          }
        ]
      },
      innerUpClasses() {
        return `${prefixCls}-handler-up-inner ${iconPrefixCls} ${iconPrefixCls}-ios-arrow-up`
      },
      downClasses() {
        return [
          `${prefixCls}-handler`,
          `${prefixCls}-handler-down`,
          {
            [`${prefixCls}-handler-down-disabled`]: this.downDisabled
          }
        ]
      },
      innerDownClasses() {
        return `${prefixCls}-handler-down-inner ${iconPrefixCls} ${iconPrefixCls}-ios-arrow-down`
      },
      inputWrapClasses() {
        return `${prefixCls}-input-wrap`
      },
      inputClasses() {
        return `${prefixCls}-input`
      },
      precisionValue() {
        // can not display 1.0
        if (!this.currentValue) return this.currentValue
        return this.precision ? this.currentValue.toFixed(this.precision) : this.currentValue
      },
      formatterValue() {
        if (this.formatter && this.precisionValue !== null) {
          return this.formatter(this.precisionValue)
        } else {
          return this.precisionValue
        }
      }
    },
    methods: {
      preventDefault(e) {
        e.preventDefault()
      },
      up(e) {
        const targetVal = Number(e.target.value)
        if (this.upDisabled && isNaN(targetVal)) {
          return false
        }
        this.changeStep('up', e)
      },
      down(e) {
        const targetVal = Number(e.target.value)
        if (this.downDisabled && isNaN(targetVal)) {
          return false
        }
        this.changeStep('down', e)
      },
      changeStep(type, e) {
        if (this.disabled || this.readonly) {
          return false
        }

        const targetVal = Number(e.target.value)
        let val = Number(this.currentValue)
        const step = Number(this.step)
        if (isNaN(val)) {
          return false
        }

        // input a number, and key up or down
        if (!isNaN(targetVal)) {
          if (type === 'up') {
            if (addNum(targetVal, step) <= this.max) {
              val = targetVal
            } else {
              return false
            }
          } else if (type === 'down') {
            if (addNum(targetVal, -step) >= this.min) {
              val = targetVal
            } else {
              return false
            }
          }
        }

        if (type === 'up') {
          val = addNum(val, step)
        } else if (type === 'down') {
          val = addNum(val, -step)
        }
        this.setValue(val)
      },
      setValue(val) {
        // 如果 step 是小数，且没有设置 precision，是有问题的
        if (val && !isNaN(this.precision)) val = Number(Number(val).toFixed(this.precision))

        this.$nextTick(() => {
          this.currentValue = val
          this.$emit('input', val)
          this.$emit('on-change', val)
          this.dispatch('FormItem', 'on-form-change', val)
        })
      },
      focus(event) {
        this.focused = true
        this.$emit('on-focus', event)
      },
      blur() {
        this.focused = false
        this.$emit('on-blur')
      },
      keyDown(e) {
        if (e.keyCode === 38) {
          e.preventDefault()
          this.up(e)
        } else if (e.keyCode === 40) {
          e.preventDefault()
          this.down(e)
        }
      },
      change(event) {
        let val = event.target.value.trim()
        if (this.parser) {
          val = this.parser(val)
        }
        // eslint-disable-next-line
        if (event.type == 'input' && val.match(/^\-?\.?$|\.$/)) return // prevent fire early if decimal. If no more input the change event will fire later

        const { min, max } = this
        const isEmptyString = val.length === 0
        val = Number(val)

        if (isEmptyString) {
          this.setValue(null)
          return
        }
        if (event.type == 'change') {
          if (val === this.currentValue && val > min && val < max) return // already fired change for input event
        }

        if (!isNaN(val) && !isEmptyString) {
          this.currentValue = val

          if (event.type == 'input' && val < min) return // prevent fire early in case user is typing a bigger number. Change will handle this otherwise.
          if (val > max) {
            this.setValue(max)
          } else if (val < min) {
            this.setValue(min)
          } else {
            this.setValue(val)
          }
        } else {
          event.target.value = this.currentValue
        }
      },
      changeVal(val) {
        val = Number(val)
        if (!isNaN(val)) {
          const step = this.step

          this.upDisabled = val + step > this.max
          this.downDisabled = val - step < this.min
        } else {
          this.upDisabled = true
          this.downDisabled = true
        }
      }
    },
    mounted() {
      this.changeVal(this.currentValue)
    },
    watch: {
      value(val) {
        this.currentValue = val
      },
      currentValue(val) {
        this.changeVal(val)
      },
      min() {
        this.changeVal(this.currentValue)
      },
      max() {
        this.changeVal(this.currentValue)
      }
    }
  }
</script>

<style scoped lang="less">
  @import '../../src/styles/common.less';

  .upHandler {
    width: 44px;
    height: 100%;
    border-left: 1px solid @border-color-base;
    background: #fff;
    position: absolute;
    top: 0;
    right: 0;
    opacity: 1;
    transition: opacity @transition-time @ease-in-out;

    &:hover {
      border-left: 1px solid #2bc7c6;
    }
  }

  .downHandler {
    width: 44px;
    height: 100%;
    border-right: 1px solid @border-color-base;
    background: #fff;
    position: absolute;
    top: 0;
    /*right: 0;*/
    opacity: 1;
    transition: opacity @transition-time @ease-in-out;

    &:hover {
      border-right: 1px solid #2bc7c6;
    }
  }

  /deep/ .ivu-input-number-input-wrap {
    height: 44px;
  }

  /deep/ .ivu-input-number-input {
    width: 100%;
    height: 45px;
    line-height: 45px;
    padding: 0 44px;
    font-size: 18px;
    text-align: center;
    outline: 0;
    -moz-appearance: textfield;
    color: #666;
    border: 0;
    border-radius: 4px;
    -webkit-transition: all 0.2s linear;
    transition: all 0.2s linear;
  }

  /deep/ .ivu-input-number-handler {
    height: 45px;
  }

  /deep/ .ivu-input-number-handler-up-inner, .ivu-input-number-handler-down-inner {
    width: 36px;
    height: 36px;
    line-height: 36px;
    font-size: 20px;
    color: #999;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: absolute;
    right: 5px;
    -webkit-transition: all 0.2s linear;
    transition: all 0.2s linear;
  }

  .ivu-input-number {
    /*&:hover {*/
      /*border-color: #2bc7c6*/
    /*}*/

    &:focus {
      /*border-color: #2bc7c6*/
      /*box-shadow: 0 0 0 0;*/
    }
  }
</style>