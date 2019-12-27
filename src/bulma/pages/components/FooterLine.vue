<template>
    <tfoot class="split-line">
        <tr class="has-background-light">
            <td colspan="2">
                <a class="button is-success"
                    :class="{'is-loading': processing}"
                    @click="$emit('add-line')">
                    <fa icon="plus"/>
                </a>
                <slot name="actions-left"
                    :processing="processing"/>
            </td>
            <td class="is-bold has-text-right has-text-danger balance">
                <span class="is-bold has-text-right has-text-danger"
                    v-if="![-100, 0].includes(balance)">
                    {{ balance }}
                </span>
                <span class="has-text-success"
                    v-else-if="balance === 0">
                    {{ i18n('balanced') }}
                    <span class="icon">
                        <fa icon="check"/>
                    </span>
                </span>
            </td>
            <td>
                <a class="button is-success"
                    :class="{'is-loading': processing}"
                    @click="$emit('save')">
                    {{ i18n('Save') }}
                </a>
            </td>
        </tr>
    </tfoot>
</template>

<script>
export default {
    name: 'FooterLine',

    inject: ['i18n'],

    props: {
        processing: {
            type: Boolean,
            required: true,
        },
        balance: {
            type: Number,
            required: true,
        },
    },
};
</script>

<style>
    .balance {
        font-family: monospace;
        font-size: 1.1em;
    }
</style>
