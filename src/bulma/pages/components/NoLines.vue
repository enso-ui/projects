<template>
    <div class="level">
        <div class="level-left">
            <a class="button is-success"
               :class="{'is-loading': processing}"
               @click="$emit('add-line')">
               Add First Project<fa icon="plus" class="has-margin-left-medium"/>
            </a>
            <slot name="actions-left"
                :processing="processing"/>
        </div>
    </div>
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
    },
};
</script>
