/*eslint-disable*/
import RouterLink from '@/components/RouterLink.vue'
import matchRoutes from '@/util/match-routes.js'
// import Router from './core.js'

// const matchRoutes = ($el, routeMap) => {
// }
const initPageElement = ($el, isRoot) => {
  const defaultStyles = {
    position: isRoot ? 'fixed' : 'absolute',
    overflow: isRoot ? 'hidden' : 'auto',
    transform: isRoot ? '' : 'translateX(100%)',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    margin: 0,
    padding: 0,
    border: 0,
    outline: 0,
    transition: 'all .3s'
  }
  Object.keys(defaultStyles).forEach(key => $el.style[key] = defaultStyles[key])
}

export {RouterLink}
export default {
  install (Vue, options) {
    const {routeMap, el} = options
    const $root = document.querySelector(el)
    initPageElement($root, true)
    const veneerHistory = {
      current: null,
      stack: []
    }
    const hStack = veneerHistory.stack

    window.onpopstate = e => {
      if (e.state.token === hStack[veneerHistory.current - 1].token) {
        const prev = hStack.pop()
        const {instance} = prev
        const {$el} = instance
        $el.style.transform = 'translateX(100%)'
        $el.addEventListener('transitionend', e => {
          instance.$destroy()
          $root.removeChild($el)
        })
      }
    }
    function pushToHistory(path, routeMap) {
      const $el = document.createElement('div')
      const token = (new Date()).getTime()
      $root.appendChild($el)
      const routes = routeMap
      history.pushState({token}, '', path)
      const Component = matchRoutes(routes)
      const instance = new Vue({
        el: $el,
        render: h => h(Component)
      })
      hStack.push({
        path,
        token,
        instance
      })
      veneerHistory.current = veneerHistory.current === null ? 0 : veneerHistory.current + 1
      initPageElement(instance.$el)
      setTimeout(() => {
        instance.$el.style.transform = ''
      })
    }

    Vue.prototype.$veneer = {
      history: veneerHistory,
      routeMap,
      push (path) {
        pushToHistory(path, routeMap)
      }
    }
    Vue.component('router-link', RouterLink)

    pushToHistory(location.pathname, routeMap)
  }
}
