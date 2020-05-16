<template>
    <div>
        <CCard>
            <CCardHeader>
                <CIcon name="cil-speedometer"/><strong> Users</strong>
                <div class="card-header-actions">
                </div>
            </CCardHeader>
                <form @submit.prevent="submit">
                <CCardBody>

                    <CRow>
                        <CCol sm="12">
                            <CInput
                                    :label="$t('userModule.form.name')"
                                    v-model="user.name"
                                    type="text"
                                    :placeholder="$t('userModule.form.name')"
                                    :class="($v.user.name.$error) ? 'is-invalid' : ''"
                                    @input="$v.user.name.$touch()"
                                    @blur="$v.user.name.$touch()"
                            ></CInput>
                        </CCol>
                    </CRow>



                    <CRow>
                        <CCol sm="12">
                            <CInput
                                    :label="$t('userModule.form.surname')"
                                    v-model="user.surname"
                                    type="text"
                                    :placeholder="$t('userModule.form.surname')"
                                    :class="($v.user.surname.$error) ? 'is-invalid' : ''"
                                    @input="$v.user.surname.$touch()"
                                    @blur="$v.user.surname.$touch()"
                            ></CInput>
                        </CCol>
                    </CRow>
                    <!--end row-->

                    <CRow>
                        <CCol sm="12">
                            <CSelect
                                :label="$t('userModule.form.role')"
                                :options="roles"
                                value-field="id"
                                text-field="role"
                                v-model="user.role_id"
                             />
                        </CCol>
                    </CRow>
                    <!--end row-->

                    <!--start row-->
                    <CRow>
                        <CCol sm="12">
                            <CInput
                                    :label="$t('userModule.form.email')"
                                    v-model="user.email"
                                    type="email"
                                    autocomplete="off"
                                    :placeholder="$t('userModule.form.email')"
                                    :class="($v.user.email.$error) ? 'is-invalid' : ''"
                                    @input="$v.user.email.$touch()"
                                    @blur="$v.user.email.$touch()"
                            ></CInput>
                        </CCol>
                    </CRow>
                    <!--end row-->

                    <!--start row-->

                    <CRow>
                        <CCol sm="6">

                            <CInput
                                    :label="$t('userModule.form.password')"
                                    v-model="psw_computed"
                                    :type="changePswType_computed"
                                    autocomplete="off"
                                    :placeholder="$t('userModule.form.password')"
                                    :class="($v.psw_data.$error) ? 'is-invalid' : ''"
                                    @input="$v.psw_data.$touch()"
                                    @blur="$v.psw_data.$touch()"
                            >
                                <template #prepend-content>
                                    <i class="fal fa-cog" @click="generatePsw()"></i>
                                </template>
                                <template #append-content>
                                    <i :class="changePsw_computed" @click="changePsw()"></i>
                                </template>

                            </CInput>

                        </CCol>
                        <CCol sm="6">

                            <CInput
                                :label="$t('userModule.form.confirm_password')"
                                v-model="psw_confirm_computed"
                                :type="changePswType_computed"
                                :placeholder="$t('userModule.form.confirm_password')"
                                :class="($v.psw_confirm_data.$error) ? 'is-invalid' : ''"
                                @input="$v.psw_confirm_data.$touch()"
                                @blur="$v.psw_confirm_data.$touch()"
                            >
                            </CInput>

                        </CCol>
                    </CRow>

                </CCardBody>

                <CCardFooter>
                    <button class="button" type="submit" :disabled="submitStatus === 'PENDING'">Submit!</button>
                    <div @click="submit()">{{getLabel.btn}}</div>
                </CCardFooter>
                </form>
        </CCard>
    </div>

</template>
<script>

    import { mapGetters, mapActions } from 'vuex'
    import { required,  email, requiredIf, maxLength, sameAs, minLength } from "vuelidate/lib/validators";
    import Util from '@/utils'
    export default {
        data() {
            return {
                submitStatus: null,
                clPsw: "",
                clPswType: "",
                psw_data: "",
                psw_confirm_data: "",
            };
        },
        metaInfo(){
            return {
                title: Util.firstUpper(this.getLabel.title)
            }
        },
        validations() {
            let v = {
                user: {
                    name: {
                        required,
                        minLength: minLength(4)
                    },
                    surname: {
                        required,
                        minLength: minLength(4)
                    },
                    email: {
                        required,
                        email
                    },
                },

                psw_data: {},
                psw_confirm_data: {
                    sameAsPassword: sameAs('psw_data')
                },
            }
            if(this.$route.params.action == 'create') {
                v.psw_data = { required }
                v.psw_confirm_data = { required }
            }
            if( this.psw_data != '' ) {
                v.psw_data['minLength'] = minLength(6)
            }
            return v

        },
        computed: {
            ...mapGetters({
                user: 'userModule/user',
                roles: 'roleModule/roles',
            }),
            getLabel : function() {
                var ret = {};
                if(this.$route.params.action == 'create'){
                    ret.title = this.$t('general.add')
                    ret.btn = this.$t('general.save')
                } else {
                    ret.title = this.$t('general.edit')
                    ret.btn = this.$t('general.modify')
                }
                return ret
            },

            changePsw_computed: {
                get: function() {
                    return this.clPsw == "" ? "fal fa-eye-slash" : this.clPsw;
                },
                set: function(value) {
                    this.clPsw = value
                },
            },

            changePswType_computed: {
                get: function() {
                    return this.clPswType == "" ? "password" : this.clPswType;
                },
                set: function(value) {
                    this.clPswType = value
                },
            },

            psw_computed: {
                get: function() {
                    return this.psw_data
                },
                set: function(value) {
                    this.psw_data = value
                },
            },

            psw_confirm_computed: {
                get: function() {
                    return this.psw_confirm_data
                },
                set: function(value) {
                    this.psw_confirm_data = value
                },
            },



        },
        methods: {
            //...mapActions('storeUtils', ['toast']),

            changePsw: function() {
                this.changePsw_computed = (this.changePsw_computed == "fal fa-eye-slash") ? "fal fa-eye" : "fal fa-eye-slash"
                this.changePswType_computed = (this.changePswType_computed == "password") ? "text" : "password"
            },
            generatePsw: function() {
                let pswGenerated = Util.generatePasswor()
                this.psw_computed = pswGenerated
                this.psw_confirm_computed = pswGenerated
            },
            submit() {
                this.$v.$touch();
                if (this.$v.$invalid) {
                    this.submitStatus = "ERROR";
                    //this.toast({msg: 'toast.validate_problem', variant: 'danger'});
                } else {
                    this.submitStatus = "PENDING";
                    var parameters = {
                        urlToConnect: 'users',
                        methodToConnect: 'post',
                        name: this.$store.state.userModule.user.name,
                        surname: this.$store.state.userModule.user.surname,
                        role_id: this.$store.state.userModule.user.role_id,
                        email: this.$store.state.userModule.user.email,
                    }

                    if(this.$route.params.action == 'edit')
                    {
                        parameters.urlToConnect = 'users/' + this.$route.params.id;
                        parameters._method = "patch";
                        if(this.psw_data != '')
                        {
                            parameters.password = this.psw_data;
                        }
                    } else {
                        parameters.password = this.psw_data;
                    }
                    this.$store.dispatch('userModule/save', parameters).then(() => {
                        this.submitStatus = "OK";
                    });
                }
            },
            details () {
                this.$store.dispatch('userModule/details', {urlToConnect: 'users/'+this.$route.params.id+'/edit', id: this.$route.params.id})
            },
            create () {
                this.$store.dispatch('userModule/create', {urlToConnect: 'users/create'})
            },
        },
        watch: {
            '$route' (to, from) {
                if(this.$route.params.action == 'edit') {
                    this.details()
                } else if(this.$route.params.action == 'create') {
                    this.create();
                }
            }
        },
        created () {
            if(this.$route.params.action == 'edit') {
                this.details()
            } else if(this.$route.params.action == 'create') {
                this.create()
            }
        }

    }
</script>
