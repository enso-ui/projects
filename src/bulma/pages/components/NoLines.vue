<template>
    <div class="level">
        <div class="level-left">
            <a class="button is-success"
               :class="{'is-loading': processing}"
               @click="$emit('add-line')">
               <span>
                    {{ i18n('Add First Project') }}
               </span>
               <span class="icon">
                    <fa icon="plus"/>
                </span>
            </a>
            <slot name="actions-left"
                :processing="processing"/>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NoLines',

    inject: ['i18n'],

    props: {
        processing: {
            type: Boolean,
            required: true,
        },
    },
};
</script>
