<template>
    <div class="box info-box"
        :class="create ? 'is-warning' : 'is-success' ">
        <ul>
            <li>
                <label slot="left"
                    class="label">
                    {{ i18n('Name') }}:
                </label>
                <input slot="right"
                    v-model="costCenter.name"
                    class="input">
            </li>
            <li>
                <label slot="left"
                    class="label">
                    {{ i18n('Active') }}:
                </label>
                <vue-switch slot="right"
                    v-model="costCenter.is_active"
                    type="is-success"/>
            </li>
            <div class="has-margin-bottom-large">
                <label slot="left"
                    class="label">
                    {{ i18n('Description') }}:
                </label>
                <textarea slot="right"
                    v-model="costCenter.description"
                    class="input"/>
            </div>
            <li>
                <div v-if="create"
                    slot="left">
                    <button class="button is-small is-outlined"
                        @click="$emit('cancel');">
                        <span>
                            {{ i18n('Cancel') }}
                        </span>
                        <span class="icon is-small">
                            <fa icon="ban"/>
                        </span>
                    </button>
                </div>
                <button v-if="!create"
                    slot="left"
                    class="button is-small is-danger is-outlined"
                    @click="destroy">
                    <span>
                        {{ i18n('Delete') }}
                    </span>
                    <span class="icon is-small">
                        <fa icon="trash"/>
                    </span>
                </button>
                <button v-if="create"
                    slot="right"
                    :disabled="!costCenter.name"
                    class="button is-small is-warning"
                    @click="store">
                    <span>
                        {{ i18n('Save') }}
                    </span>
                    <span class="icon is-small">
                        <fa icon="ban"/>
                    </span>
                </button>
                 <button v-if="!create"
                    slot="right"
                    :disabled="!costCenter.name"
                    class="button is-small is-success"
                    @click="update">
                    <span>
                        {{ i18n('Update') }}
                    </span>
                    <span class="icon is-small">
                        <fa icon="ban"/>
                    </span>
                </button>
            </li>
        </ul>
    </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faPlusSquare, faDatabase, faBan, faEdit, faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { VueSwitch } from '@enso-ui/bulma';

library.add([faPlusSquare, faDatabase, faBan, faEdit, faTrash]);
export default {
    name: 'CostCenter',

    components: { VueSwitch },

    inject: ['i18n', 'errorHandler', 'route'],

    props: {
        costCenter: {
            type: Object,
            required: true,
        },
        create: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        store() {
            axios.post(this.route('administration.costCenters.store'), this.costCenter)
                .then(({ data }) => {
                    this.$toastr.success(data.message);
                    this.$emit('create', data.costCenter);
                }).catch((error) => {
                    if (error.response.status === 422) {
                        this.$toastr.warning(this.i18n('Choose another name'));
                    }
                    this.errorHandler(error);
                });
        },
        update() {
            axios.patch(this.route('administration.costCenters.update', this.costCenter.id), this.costCenter)
                .then(({ data }) => {
                    this.$toastr.success(data.message);
                    this.$emit('update', data.costCenter);
                }).catch((error) => {
                    if (error.response.status === 422) {
                        this.$toastr.warning(this.i18n('Choose another name'));
                    }
                    this.errorHandler(error);
                });
        },
        destroy() {
            axios.delete(this.route('administration.costCenters.destroy', this.costCenter.id))
                .then(({ data }) => {
                    this.$toastr.success(data.message);
                    this.$emit('destroy');
                }).catch(error => this.errorHandler(error));
        },
    },
};

</script>

<style lang="scss" scoped>

    textarea {
        resize: none;
        height: 5em;
        width: 100%;
    }

</style>
