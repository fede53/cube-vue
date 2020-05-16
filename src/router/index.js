import Vue from 'vue'
import store from "@/store";
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
    mode: "history",
    linkActiveClass: 'active',
    scrollBehavior: () => ({ y: 0 }),
    routes: configRoutes()
})

router.beforeEach((to, from, next) => {
    let expiration = window.localStorage.getItem('tokenExpiration')
    let unixTimestamp = new Date().getTime() / 1000

    if (!(expiration !== null && parseInt(expiration) - unixTimestamp > 0)) {
        store.dispatch('authData/logout').then(() => {
            store.commit('authData/setIsAuthenticated',  false)
        })
    } else {
        store.commit('authData/setIsAuthenticated',  true)
    }

    if (to.matched.some(record => record.meta.requiresLogin)) {
        if (!store.getters["authData/isAuthenticated"]) {
            next({
                name: 'Login'
            })
        } else {
            if( to.meta.admin == true && window.localStorage.getItem('role_id') > 2 ) {
                next({
                    name: 'Dashboard'
                })
            } else {
                next()
            }
        }
    } else {
        if(typeof to.name != 'undefined' && to.name.search("login") > -1){
            if (store.getters["authData/isAuthenticated"]) {
                next({
                    name: 'Dashboard'
                })
            }
        }
        next()
    }
});

function configRoutes () {
    return [
        {
            path: '/',
            redirect: '/dashboard',
            component: () => import('@/containers/TheContainer'),
            meta: {
                label: 'Home',
                requiresLogin: true,
                admin: false
            },
            children: [
                {
                    path: 'dashboard',
                    name: 'Dashboard',
                    component: () => import('@/views/Dashboard'),
                    meta: {
                        label: 'Dashboard',
                        requiresLogin: true,
                        noCache: true,
                        admin: false
                    },
                },
                {
                    path: '',
                    redirect: '/users',
                    meta: {
                        requiresLogin: true,
                        noCache: true,
                        admin: false
                    },
                    component: {
                        render(c) {
                            return c('router-view')
                        }
                    },
                    children: [
                        {
                            path: 'users',
                            name: 'Users.list',
                            component: () => import('@/views/users/List'),
                            meta: {
                                label: 'User List',
                                requiresLogin: true,
                                noCache: true,
                                admin: false
                            },
                        },
                        {
                            path: '/users/:id?/:action',
                            name: 'Users.form',
                            component: () => import('@/views/users/Form'),
                            meta: {
                                label: 'User Form',
                                requiresLogin: true,
                                noCache: true,
                                admin: false
                            },
                        }
                    ]
                },
            ]
        },

        {
            path: '/',
            component: {
                render (c) { return c('router-view') }
            },
            children: [
                {
                    path: '404',
                    name: 'Page404',
                    component: () => import('@/views/pages/Page404')
                },
                {
                    path: 'login',
                    name: 'Login',
                    component: () => import('@/views/auth/Login')
                },
            ]
        },
        {
            path: "*",
            component: () => import('@/views/pages/Page404'),
            meta: { requiresLogin: false, noCache: true, admin: false },
        }

    ]
}

export default router;

