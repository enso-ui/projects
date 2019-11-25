<template>
    <div class="wrapper">
        <div v-if="ready"
             class="columns is-centered is-multiline">
            <div class="column is-4">
                <enso-select-filter v-model="params.businessDomainIds"
                    multiple
                    class="box raises-on-hover"
                    source="administration.businessDomains.options"
                    :name="i18n('Business Domain')"/>
            </div>
        </div>
        <enso-table id="projects"
            class="box is-paddingless raises-on-hover is-rounded"
            :path="path">
            <template v-slot:status="{ row }">
                <span v-for="businessDomain in row.businessDomainsArray"
                    :key="businessDomain"
                    class="tag is-table-tag is-info has-margin-right-small">
                    {{ businessDomain }}
                </span>
            </template>
            <template v-slot:status="{ row }">
                <span class="tag is-table-tag">
                    {{ i18n(row.status) }}
                </span>
            </template>
        </enso-table>

        <filter-state ref="filterState"
            name="contractFilters"
            :api-version="apiVersion"
            :params="params"
            @ready="ready = true"/>
    </div>
</template>

<script>

import {
    EnsoTable, EnsoSelectFilter, FilterState,
} from '@enso-ui/bulma';
export default {
    components: {
        EnsoTable, FilterState, EnsoSelectFilter,
    },

    inject: ['i18n', 'route'],

    data() {
        return {
            apiVersion: 1.2,
            path: this.route('projects.initTable'),
            ready: false,
            params: {
                businessDomainIds: [],
            },
        };
    },
};

</script>
