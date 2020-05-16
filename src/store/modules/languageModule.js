import Vue from 'vue'
import appService from '@/server/app.service'
import Util from "@/utils";

export default {
    state :
    {
        languages: [],
        language: [],
        id: 0
    },
    getters :
    {
        languages: state => state.languages,
        language: state => state.language,
    },
    actions :
    {
        list(context, credentials) {


            appService.connectToServer(credentials).then(data => {
                context.commit('list', data)
            }).catch(error => {
                this.error = error.toString()
                this.dispatch('storeUtils/toast', { msg: 'toast.same_error', variant: 'danger' })
            })
        },
        details(context, credentials) {
            appService.connectToServer(credentials).then(data => {
                context.commit('details', data)
            }).catch(error => {
                this.error = error.toString()
                this.dispatch('storeUtils/toast', { msg: 'toast.same_error', variant: 'danger' })

            })
        },
        create(context, credentials) {
            appService.connectToServer(credentials).then(data => {
                this.commit('roleModule/list', data.roles)
                context.commit('create', data)
            }).catch(error => {
                this.error = error.toString()
                this.dispatch('storeUtils/toast', { msg: 'toast.same_error', variant: 'danger' })

            })
        },
        save(context, credentials) {
            appService.connectToServer(credentials).then(data => {
                let toastVariant = 'success'
                let toastMsg = 'toast.success'
                context.commit('save')
                context.dispatch('list', {urlToConnect: 'languages'})
                this.dispatch('storeUtils/toast', { msg: toastMsg, variant: toastVariant })
            }).catch(error => {
                this.dispatch('storeUtils/toast', {msg: Util.formatError(error), variant: 'danger'})
            })
        },
        delete(context, credentials) {
            appService.connectToServer(credentials).then(data => {
                if( data.success ) {
                    context.commit('delete', { success: data.success, id: data.id  })
                }
                this.dispatch('storeUtils/toast', { msg: 'toast.success', variant: 'success' })
            }).catch(error => {
                this.error = error.toString()
                this.dispatch('storeUtils/toast', { msg: 'toast.same_error', variant: 'danger' })
            })
        },
        changeProjectOrder(context, credentials) {
            appService.connectToServer(credentials).then(data => {
                this.dispatch('storeUtils/toast', { msg: 'toast.success', variant: 'success' })
            }).catch(error => {
                this.error = error.toString()
                this.dispatch('storeUtils/toast', { msg: 'toast.same_error', variant: 'danger' })
            })
        },
        saveSingleField(context, credentials) {
            appService.connectToServer(credentials).then(data => {
                this.dispatch('storeUtils/toast', { msg: 'toast.success', variant: 'success' })
            }).catch(error => {
                this.error = error.toString()
                this.dispatch('storeUtils/toast', { msg: 'toast.same_error', variant: 'danger' })
            })
        },
        changeLanguageOrder (context, credentials) {
            context.commit('changeLanguageOrder', credentials)
        },


        reset (context) {
            this.state.language = []
        },
    },
    mutations :
    {
        list(state, data) {
            state.language = []
            state.languages = data.result
        },
        details (state, data) {
            state.language = data.result
        },
        create (state, data) {
        },
        save (state) {
            state.language = []
        },
        delete (state, data) {
            let index = Vue._.findIndex(state.languages, function(o) { return o.id == data.id; });
            state.languages.splice(index, 1)
        },
        changeLanguageOrder (state, data) {
            state.languages = data;
        },
    }
}
