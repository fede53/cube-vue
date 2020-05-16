<template>
    <CContainer class="d-flex content-center min-vh-100">
        <CCardGroup>
            <CCard class="p-4 box-login">
                <CCardBody>
                    <CForm>
                        <h1>Login</h1>
                        <p class="text-muted">Sign In to your account</p>
                        <CInput
                                placeholder="Username"
                                autocomplete="username email"
                                v-model="email"
                        >
                            <template #prepend-content><CIcon name="cil-user"/></template>
                        </CInput>
                        <CInput
                                placeholder="Password"
                                type="password"
                                autocomplete="curent-password"
                                v-model="password"
                        >
                            <template #prepend-content><CIcon name="cil-lock-locked"/></template>
                        </CInput>
                        <CRow>
                            <CCol col="6" class="text-left">
                                <CButton color="primary" class="px-4" @click.prevent="formSubmit">Login</CButton>
                            </CCol>
                            <CCol col="6" class="text-right">
                                <CButton color="link" class="px-0">Forgot password?</CButton>
                                <CButton color="link" class="d-md-none">Register now!</CButton>
                            </CCol>
                        </CRow>
                    </CForm>
                </CCardBody>
            </CCard>
        </CCardGroup>
    </CContainer>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    metaInfo: {
        // if no subcomponents specify a metaInfo.title, this title will be used
        title: "SignIn"
    },
    name: 'login',
    data () {
        return{
            email : "",
            password : ""
        }
    },
    computed: {
        ...mapGetters("authData", ["loading", "error"])
    },
    methods: {
        ...mapActions({
            logout: 'logout'
        }),
        formSubmit () {
            this.$store.dispatch('authData/login', {urlToConnect: 'login', methodToConnect: 'post', email: this.email, password: this.password})

        }
    },
    created() {
        if(this.$store.getters.isAuthenticated){
            this.$router.replace("/")
        }
    }
}
</script>
