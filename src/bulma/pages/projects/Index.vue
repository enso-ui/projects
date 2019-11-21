<template>
    <enso-table id="projects"
        class="box is-paddingless raises-on-hover is-rounded"
        :path="path">
        <template v-slot:contract="{ row }">
            <span v-if="row.contractNumber" class="tag is-table-tag is-info">
                {{ `${row.contractNumber} / ${row.contractDate}` }}
            </span>
        </template>
        <template v-slot:status="{ row }">
            <span class="tag is-table-tag">
                {{ i18n(row.status) }}
            </span>
        </template>
    </enso-table>
</template>

<script>

import { EnsoTable } from '@enso-ui/bulma';

export default {
    components: { EnsoTable },

    inject: ['i18n', 'route'],

    data() {
        return {
            path: this.route('projects.initTable'),
        };
    },
};

</script>
