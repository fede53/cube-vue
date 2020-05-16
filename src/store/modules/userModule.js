import Vue from 'vue'
import appService from '@/server/app.service'
import router from '@/router'
import Util from "@/utils";

export default {
    state :
    {
        users: [],
        user: [],
        id: 0
    },
    getters :
    {
        users: state => state.users,
        user: state => state.user,
    },
    actions :
    {
        list(context, credentials) {
            appService.connectToServer(credentials).then(data => {
                context.commit('list', data)
            }).catch(error => {
                this.error = error.toString()
                this.dispatch('storeUtils/toast', {msg: 'toast.same_error', variant: 'danger'})
            })
        },
        details(context, credentials) {
            appService.connectToServer(credentials).then(data => {
                context.commit('details', data)
                this.commit('roleModule/list', data.roles)
            }).catch(error => {
                this.error = error.toString()
                this.dispatch('storeUtils/toast', {msg: 'toast.same_error', variant: 'danger'})

            })
        },
        create(context, credentials) {
            appService.connectToServer(credentials).then(data => {
                this.commit('roleModule/list', data.roles)
                context.commit('create', data)
            }).catch(error => {
                this.error = error.toString()
                this.dispatch('storeUtils/toast', {msg: 'toast.same_error', variant: 'danger'})

            })
        },
        save(context, credentials) {
            appService.connectToServer(credentials).then(data => {
                let toastVariant = 'success'
                let toastMsg = 'toast.success'
                context.commit('save')
                this.dispatch('storeUtils/toast', {msg: toastMsg, variant: toastVariant})
            }).catch(error => {
                this.dispatch('storeUtils/toast', {msg: Util.formatError(error), variant: 'danger'})
            })
        },
        delete(context, credentials) {
            appService.connectToServer(credentials).then(data => {
                if( data.success ) {
                    context.commit('delete', { success: data.success, id: data.id  })
                }
                this.dispatch('storeUtils/toast', {msg: 'toast.success', variant: 'success'})
            }).catch(error => {
                this.error = error.toString()
                this.dispatch('storeUtils/toast', {msg: 'toast.same_error', variant: 'danger'})
            })
        },
        reset (context) {
            this.state.user = []
            this.state.userProjects = []
        },
    },
    mutations :
    {
        list(state, data) {
            state.user = []
            state.users = data.result
        },
        details (state, data) {
            state.user = data.result
        },
        create (state, data) {
            state.user = []
            state.user.email = ''
            state.user.password = ''
            state.user.role_id = 1
        },
        save (state) {
            state.user = []
            router.push({ name: 'users.list' })
        },
        delete (state, data) {
            let index = Vue._.findIndex(state.users, function(o) { return o.id == data.id; });
            state.users.splice(index, 1)
        },
        setPsw(state, psw) {
            state.user.password = psw
        },
        setConfirmPsw(state, psw) {
            state.user.confirm_password = psw
        },
    }
}
