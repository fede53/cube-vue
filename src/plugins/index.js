import CoreuiVue from '@coreui/vue'
import VueGoodTablePlugin from "vue-good-table";
import Vuelidate from "vuelidate";
import Toasted from 'vue-toasted';
import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';
import 'vue-good-table/dist/vue-good-table.css'
import '../assets/fa5/css/all.min.css'

export default {
    install(Vue) {
        Vue.use(CoreuiVue)
        Vue.use(VueGoodTablePlugin)
        Vue.use(Vuelidate)
        Vue.use(Toasted)
        Vue.use(VueSweetalert2)
    }
}