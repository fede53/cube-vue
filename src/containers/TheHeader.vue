<template>
    <CHeader fixed with-subheader light class="bg-primary">

        <CToggler
                in-header
                class="ml-3 d-lg-none "
                @click="$store.commit('layoutModule/toggleSidebarMobile')"
                color="primary"
        />
        <CToggler
                in-header
                class="ml-3 d-md-down-none"
                @click="$store.commit('layoutModule/toggleSidebarDesktop')"
                color="primary"
        />

        <CHeaderBrand class="mx-auto d-lg-none" to="/">
            <img class="logo_w"
                    :src="logo"
            />
        </CHeaderBrand>

        <CHeaderNav class="d-md-down-none mr-auto">
            <CHeaderNavItem class="px-3">
                <CHeaderNavLink to="/dashboard">
                    Dashboard
                </CHeaderNavLink>
            </CHeaderNavItem>

            <!--
            <CHeaderNavItem class="px-3">
                <CHeaderNavLink to="/users" exact>
                    Users
                </CHeaderNavLink>
            </CHeaderNavItem>

            <CHeaderNavItem class="px-3">
                <CHeaderNavLink>
                    Settings
                </CHeaderNavLink>
            </CHeaderNavItem>
            -->



        </CHeaderNav>

        <CHeaderNav class="mr-4">
            <CHeaderNavItem class="d-md-down-none mx-2">
                <CHeaderNavLink>
                    <CIcon name="cil-bell" color="dark"/>
                </CHeaderNavLink>
            </CHeaderNavItem>

            <CHeaderNavItem class="d-md-down-none mx-2">
                <CHeaderNavLink>
                    <CBadge color="info" shape="pill">1</CBadge>
                    <CIcon name="cil-list"/>
                </CHeaderNavLink>
            </CHeaderNavItem>

            <CHeaderNavItem class="d-md-down-none mx-2">
                <CHeaderNavLink>
                    <CIcon name="cil-envelope-open"/>
                </CHeaderNavLink>
            </CHeaderNavItem>






            <TheHeaderDropdownAccnt/>
        </CHeaderNav>

        <CSubheader class="px-3">
            <CBreadcrumbRouter class="border-0 mb-0"/>
        </CSubheader>
    </CHeader>
</template>

<script>
    import TheHeaderDropdownAccnt from './TheHeaderDropdownAccnt'

    export default {
        name: 'TheHeader',
        components: {
            TheHeaderDropdownAccnt
        },
        data () {
            return{
                logo: require("@/assets/images/logo_w.png")
            }
        },
    }
</script>
