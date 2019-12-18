<template>
    <v-popover v-bind="$attrs"
        v-on="$listeners"
        ref="popover">
        <slot name="target"/>
        <template v-slot:popover>
            <div v-if="$refs.popover && $refs.popover.isOpen">
                <slot name="component" :hide="hide"/>
            </div>
        </template>
    </v-popover>
</template>

<script>

import { VPopover } from 'v-tooltip';

export default {
    name: 'Popover',

    components: { VPopover },

    methods: {
        hide() {
            this.$refs.popover.hide();
        },
    },
};

</script>
