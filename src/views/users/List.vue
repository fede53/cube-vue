<template>
    <div>
        <CCard>
            <CCardHeader>
                <CIcon name="cil-speedometer"/><strong> Users</strong>
                <div class="card-header-actions">
                </div>
            </CCardHeader>
            <CCardBody>
                <vue-good-table
                        :columns="columns"
                        :search-options="{
                        enabled: true,
                        placeholder: $t('vue-good-table.search')
                        }"
                        :pagination-options="{
                        enabled: true,
                        mode: 'records',
                        perPage: 50,
                        perPageDropdown: [50, 100, 150],
                        nextLabel: $t('vue-good-table.next'),
                        prevLabel: $t('vue-good-table.prev'),
                        rowsPerPageLabel: $t('vue-good-table.rowPerPage'),
                        ofLabel: $t('vue-good-table.of'),
                        pageLabel: $t('vue-good-table.page'), // for 'pages' mode
                        allLabel: $t('vue-good-table.all'),
                        }"
                        :sort-options="{
                        enabled: true
                        }"
                        styleClass="tableOne vgt-table striped condensed"
                        :rows="users"
                >
                    <template slot="emptystate">
                        <div style="text-align: center">{{$t('vue-good-table.noData')}}</div>
                    </template>
                    <template slot="table-row" slot-scope="props">
                        <div v-if="props.column.field == 'name'">
                            {{ props.row.name }} {{ props.row.surname }}
                        </div>

                        <div v-else-if="props.column.field == 'button'">

                            <CButton color="success" class="btn-sm mr-1" @click="$router.push({ name: 'Users.form', params: { id: props.row.id, action: 'edit' } })">
                                <i class="fal fa-edit"></i>
                            </CButton>

                            <CButton color="danger" class="btn-sm" @click="confirmMessage(props.row.id, ''+props.row.name + ' ' + props.row.surname+'')">
                                <i class="fal fa-trash"></i>
                            </CButton>

                        </div>

                        <div v-else>
                            {{props.formattedRow[props.column.field]}}
                        </div>

                    </template>
                </vue-good-table>



            </CCardBody>
        </CCard>
    </div>

</template>
<script>
    import { mapGetters, mapActions } from 'vuex'

    export default {
        metaInfo(){
            return {
                title: "List"
            }
        },
        data() {
            return {
                isLoading: false,
                rows: [],
                totalRecords: 0,
                columns: [
                    {
                        label: this.$t("userModule.name"),
                        field: "name",
                        html: true
                    },
                    {
                        label: this.$t("userModule.role"),
                        field: "role"
                    },
                    {
                        label: this.$t("userModule.creation_date"),
                        field: "created_at",
                        type: "date",
                        dateInputFormat: "yyyy-mm-dd",
                        dateOutputFormat: "dd/mm/yyyy",
                        tdClass: "text-left",
                        thClass: "text-left"
                    },
                    {
                        label: "",
                        field: "button",
                        html: true,
                        tdClass: "text-right",
                        thClass: "text-right",
                        sortable: false
                    }
                ],
            };
        },
        computed: {
            ...mapGetters('userModule', ['users'])
        },
        methods: {
            confirmMessage(id) {
                this.$store.dispatch('storeUtils/confirm', {callback: () => {
                        this.trash(id);
                    }
                })
            },
            list () {
                this.$store.dispatch('userModule/list', {urlToConnect: 'users'})
            },
            trash(id){
                var parameters = {
                    urlToConnect: 'users/' + id,
                    methodToConnect: 'delete',
                    _method: "delete"
                }
                this.$store.dispatch('userModule/delete', parameters)
            }
        },
        watch: {
            '$route' (to, from) {
                this.list()
            }
        },
        created () {
            this.list()
            this.$store.dispatch('userModule/reset')
        }
    };
</script>
<style >
</style>
