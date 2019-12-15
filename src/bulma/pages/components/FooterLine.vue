<template>
    <tfoot class="project-line">
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
            <span v-if="balance !== 0"
                class="is-bold has-text-right has-text-danger">
                {{ balance }}
            </span>
            <span v-else
                class="has-text-success">
                {{ i18n('balanced') }} <fa icon="check"/>
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
    inject: ['i18n'],

    props: {
        processing: {
            type: Boolean,
            default: false,
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
