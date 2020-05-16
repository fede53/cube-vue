import Vue from 'vue'
import Util from "@/utils";
import appService from '@/server/app.service'

export default {
    state :
    {
        sidebar: [],

    },
    getters :
    {
        sidebar: state => state.sidebar,
    },
    actions :
    {
        getSidebar(context, credentials) {
            appService.connectToServer(credentials).then(data => {
                this.commit('roleModule/list', data.roles)
                context.commit('getSidebar', data)
            }).catch(error => {
                this.error = error.toString()
                this.dispatch('storeUtils/toast', { msg: 'toast.same_error', variant: 'danger' })
            })
        },

        setSidebar(context, credentials) {
            context.commit('setSidebar', credentials.sidebar)
            appService.connectToServer(credentials).then(data => {
                let toastVariant = 'success'
                let toastMsg = 'toast.success'
                this.dispatch('storeUtils/toast', { msg: toastMsg, variant: toastVariant })
            }).catch(error => {
                this.dispatch('storeUtils/toast', {msg: Util.formatError(error), variant: 'danger'})
            })
        },
    },
    mutations :
    {
        getSidebar(state, data) {
            if(data.result != null){
                state.sidebar = JSON.parse(data.result.sidebar)
            }
        },

        setSidebar(state, data) {
            state.sidebar = data
        },

        deleteSidebar (state, id) {

            function removeComment(items, parent) {
                for( var index = 0; index < items.length; index++ ) {
                    var item = items[index]
                    if (item.id == id) {
                        items.splice(index, 1)
                        return 0
                    }
                    // QUESTION: JS expert is it best practice to validate to this extent
                    Vue._.has(item, 'child')  ? removeComment(item.child, item) : 0;
                }
            }

            removeComment(state.sidebar, []);
        },

        addElementSidebar(state) {
            state.sidebar.push({
                id: 'r_ ' + Math.random(),
                label: '',
                link: '',
                icon: '',
                role: '',
                parameter: '',
                child: []
            });
        }

    }
}
