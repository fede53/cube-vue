import 'core-js/stable'
import Vue from 'vue'
import App from './App'
import router from './router'
import { iconsSet as icons } from './assets/icons/icons.js'
import store from "./store"
import i18n from "./lang/lang";

import Plugins from './plugins'
Vue.use(Plugins)

Vue.config.performance = true
Vue.prototype.$log = console.log.bind(console)

new Vue({
    el: '#app',
    router,
    store,
    icons,
    i18n,
    template: '<App/>',
    components: {
        App
    }
})
