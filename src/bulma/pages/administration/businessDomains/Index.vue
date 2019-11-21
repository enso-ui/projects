<template>
<enso-table id="businessDomains"
        class="box is-paddingless raises-on-hover is-rounded"
        :path="path"/>
</template>

<script>

import { EnsoTable } from '@enso-ui/bulma';

export default {
    components: { EnsoTable },

    inject: ['route'],

    data() {
        return {
            path: this.route('administration.businessDomains.initTable'),
        };
    },
};

</script>
