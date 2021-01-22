import Vue from 'vue'
import store from './store'
import App from './App'

new Vue({
  el: '#app',
  store,
  render: function (createElement) {
    return createElement(App)
  }
  // render: h => h(App)
})
