<template>
    <tr class="split-line">
        <td class="is-numeric">
            {{ index + 1 }}.
        </td>
        <td dir="ltr">
            <vue-select v-model="line.project_id"
                :source="route('projects.options')"
                :params="params"
                :has-error="errors.has(`splits.${index}.project_id`)"
                @input="errors.clear(`splits.${index}.project_id`); updateBalance()"/>
            <p class="help is-danger"
                v-if="errors.has(`splits.${index}.project_id`)">
                {{ errors.get(`splits.${index}.project_id`) }}
            </p>
        </td>
        <td class="has-text-right">
            <p class="control has-icons-right has-text-right">
                <input class="input is-numeric"
                    :class="{'is-danger': hasError}"
                    v-select-on-focus
                    v-model.number="line.percent"
                    :placeholder="i18n('percent')"
                    @input="clearErrors();">
            </p>
            <p class="help is-danger"
                v-if="hasError">
                {{ errors.get(`splits.${this.index}.percent`) || errors.get('percent') }}
            </p>
        </td>
        <td class="has-text-right small">
            <a class="button is-naked"
                @click="updateBalance"
                v-if="balance !== 0">
                <span class="icon is-small danger">
                    <fa icon="balance-scale-right"
                        size="xs"/>
                </span>
            </a>
            <a class="button is-naked"
               :class="{'is-loading': processing}"
               @click="$emit('remove')">
                <span class="icon is-small danger">
                    <fa icon="trash-alt"
                        size="xs"/>
                </span>
            </a>
        </td>
    </tr>
</template>

<script>
import { mapState } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faTrashAlt, faPercentage, faBalanceScaleRight, faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { VueSelect } from '@enso-ui/select/bulma';
import { selectOnFocus } from '@enso-ui/directives';

library.add(faTrashAlt, faPercentage, faBalanceScaleRight, faSpinner);

export default {
    name: 'RowLine',

    directives: { selectOnFocus },

    components: { VueSelect },

    inject: [
        'i18n', 'errorHandler', 'route',
    ],

    props: {
        line: {
            type: Object,
            required: true,
        },
        index: {
            type: Number,
            required: true,
        },
        balance: {
            type: Number,
            required: true,
        },
        errors: {
            type: Object,
            required: true,
        },
        processing: {
            type: Boolean,
            required: true,
        },
    },
    computed: {
        ...mapState(['enums']),
        hasError() {
            return this.errors.has('percent')
                || this.errors.has(`splits.${this.index}.percent`);
        },
        params() {
            return {'status': this.enums.projectStatuses.Ongoing};
        }
    },
    methods: {
        updateBalance() {
            if (this.line.project_id) {
                this.line.percent -= this.balance;
                this.clearErrors();
            }
        },
        clearErrors() {
            this.errors.clear('percent');
            this.errors.clear(`splits.${this.index}.percent`);
        },
    },
};
</script>
