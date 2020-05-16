import appService from '@/server/app.service'
import router from '@/router'

export default {
    state: {
        isAuthenticated: false,
        miniVariant:false,
        messages: [],
        loading: false,
        error: null
    },
    getters: {
        isAuthenticated: (state) => {
            return state.isAuthenticated
        },
        miniVariant: (state) => {
            return state.miniVariant
        },
        messages: (state) => {
            return state.messages
        },
        loading: state => state.loading,
        error: state => state.error,
    },
    actions: {
        login (context, credentials) {
            appService.connectToServer(credentials).then((data) => {
                context.commit('login', data)
            }).catch(error => {
                window.alert('Could not login!')
            })
        },
        logout (context) {
            context.commit('logout')
        },
        changeAuthenticated: (context, value) => {
            context.commit('changeAuthenticated', value)
        },
        addMessage (context, content) {
            context.commit('addMessage', content)
        },
        deleteMessage (context, id) {
            context.commit('deleteMessage', id)
        },
    },
    mutations: {
        setIsAuthenticated(state, data) {
            state.isAuthenticated = data;
        },
        setLoading(state, data) {
            state.loading = data;
            state.error = null;
        },
        login (state, loginData) {
            if(loginData.success) {
                if (typeof window !== 'undefined') {
                    let expire = new Date().getTime() + loginData.expires_in
                    window.localStorage.setItem('token', loginData.access_token)
                    window.localStorage.setItem('role_id', loginData.user.role_id)
                    window.localStorage.setItem('tokenExpiration', expire)
                    router.replace("/")
                }
                state.isAuthenticated = true
            } else {
                state.isAuthenticated = false
            }
        },
        logout (state) {
            if (typeof window !== 'undefined') {
                window.localStorage.setItem('token', null)
                window.localStorage.setItem('tokenExpiration', null)
                window.localStorage.setItem('role_id', 0)
            }
            state.isAuthenticated = false
        },
        changeAuthenticated: (context, value) => {
            state.isAuthenticated = value
        },
        addMessage (state, content) {
            state.messages.push({id: parseInt(Math.random() * 100000), msg: content})
        },
        deleteMessage (state, id) {
            let index = Vue._.findIndex(state.messages, function(o) { return o.id == id })
            state.messages.splice(index, 1)
        },
    }
};
