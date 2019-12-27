import Vue from 'vue'

const dbClick = Vue.directive('dbClick', {
  inserted(el, binding) {
    el.addEventListener('click', e => {
      if (!el.disabled) {
        el.disabled = true
        setTimeout(() => {
          el.disabled = false
        }, 1000)
      }
    })
  }
})

export { dbClick }
