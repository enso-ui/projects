<template>
    <tr class="project-line">
        <td class="is-numeric">
            {{ index + 1 }}.
        </td>
        <td>
            <vue-select v-model="line.project_id"
                :source="route('projects.options')"
                :has-error="errors.has(`projects.${index}.project_id`)"
                @input="errors.clear(`projects.${index}.project_id`); $emit('changed')"/>
        </td>
        <td class="has-text-right">
            <p class="control has-icons-right has-text-right">
                <input v-model.number="line.amount"
                    class="input is-numeric "
                    :class="{'is-danger': hasError}"
                    :placeholder="i18n('amount')"
                    @input="clearErrors();">
            </p>
        </td>
        <td class="has-text-right small">
            <a v-if="balance !== 0"
               class="button is-naked"
               @click="updateBalance">
                <span class="icon is-small danger">
                    <fa icon="balance-scale-right"
                        size="xs"/>
                </span>
            </a>
            <a class="button is-naked"
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
import { library } from '@fortawesome/fontawesome-svg-core';
import {
    faTrashAlt, faPercentage, faBalanceScaleRight, faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { VueSelect } from '@enso-ui/select/bulma';

library.add(faTrashAlt, faPercentage, faBalanceScaleRight, faSpinner);

export default {
    inject: [
        'i18n', 'errorHandler', 'route',
    ],

    components: { VueSelect },

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
    },
    computed: {
        hasError() {
            return this.errors.has('amount')
                || this.errors.has(`amount-${this.index}`);
        },
    },
    methods: {
        updateBalance() {
            this.line.amount -= this.balance;
            this.line.amount = Math.round(this.line.amount * 100) / 100;
            this.clearErrors();
        },
        clearErrors() {
            this.errors.clear('amount');
            this.errors.clear(`amount-${this.index}`);
        },
    },
};
</script>