<template>
    <enso-table id="costCenters"
        class="box is-paddingless raises-on-hover is-rounded"
        :path="path"/>
</template>

<script>

import { EnsoTable } from '@enso-ui/bulma';

export default {
    name: 'Index',

    components: { EnsoTable },

    inject: ['route'],

    data() {
        return {
            path: this.route('administration.costCenters.initTable'),
        };
    },
};

</script>
