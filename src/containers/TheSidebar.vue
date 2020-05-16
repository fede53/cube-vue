<template>
    <CSidebar
            fixed
            :minimize="minimize"
            :show="show"
            @update:show="(value) => $store.commit('set', ['layoutModule/sidebarShow', value])"
    >
        <CSidebarBrand class="d-md-down-none" to="/">
            <img
                    class="c-sidebar-brand-full"
                    :src="logo"
            />
            <img
                    class="c-sidebar-brand-minimized"
                    :src="logo_minimize"
            />
        </CSidebarBrand>

        <CRenderFunction flat :content-to-render="$options.nav"/>
        <CSidebarMinimizer
                class="d-md-down-none"
                @click.native="$store.commit('layoutModule/set', ['sidebarMinimize', !minimize])"
        />
    </CSidebar>
</template>

<script>
    import nav from './_nav'

    export default {
        name: 'TheSidebar',
        data () {
            return{
                logo: require("@/assets/images/logo.png"),
                logo_minimize: require("@/assets/images/logo_minimize.png")
            }
        },
        nav,
        computed: {
            show () {
                return this.$store.state.layoutModule.sidebarShow
            },
            minimize () {
                return this.$store.state.layoutModule.sidebarMinimize
            }
        }
    }
</script>
