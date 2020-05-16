export default {
    state : {
        roles: [],
    },
    getters : {
        roles: state => state.roles,
    },
    actions : {
        list(context, credentials) {
            appService.connectToServer(credentials).then(data => {
                context.commit('list', data.result)
            }).catch(error => {
                this.error = error.toString()
                this.dispatch('storeUtils/toast', {msg: 'toast.same_error', variant: 'danger'})
            })
        },
    },
    mutations : {
        list(state, data) {
            state.roles = data
        },
    }
}
