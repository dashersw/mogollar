import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import JsonViewer from 'vue-json-viewer'
Vue.config.productionTip = false
Vue.use(JsonViewer)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app').$nextTick(() => {
  postMessage({ payload: 'removeLoading' }, '*')

  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})
