<template>
    <div class="wrapper">
        <div class="columns is-centered">
            <div class="column is-3">
                <enso-select-filter class="box raises-on-hover"
                    v-model="filters.projects.status"
                    :options="enums.projectStatuses._select()"
                    :name="i18n('Status')"/>
            </div>
            <div class="column is-3">
                <enso-select-filter class="box raises-on-hover"
                    v-model="params.businessDomainIds"
                    multiple
                    source="administration.businessDomains.options"
                    :name="i18n('Business Domain')"/>
            </div>
        </div>
        <enso-table class="box is-paddingless raises-on-hover is-rounded"
            id="projects"
            :params="params"
            :filters="filters"
            @reset="$refs.filterState.reset()">
            <template v-slot:businessDomains="{ row }">
                <span class="tag is-table-tag is-info has-margin-right-small"
                    v-for="businessDomain in row.business_domains"
                    :key="businessDomain.id">
                    {{ businessDomain.name }}
                </span>
            </template>
            <template v-slot:status="{ row }">
                <span class="tag is-table-tag">
                    {{ i18n(row.status) }}
                </span>
            </template>
        </enso-table>
        <filter-state name="projectFilters"
            :api-version="apiVersion"
            :params="params"
            :filters="filters"
            ref="filterState"/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { EnsoTable, EnsoSelectFilter, FilterState } from '@enso-ui/bulma';

export default {
    components: { EnsoTable, FilterState, EnsoSelectFilter },

    inject: ['i18n', 'route'],

    data: () => ({
        apiVersion: 1.2,
        ready: false,
        params: {
            businessDomainIds: [],
        },
        filters: {
            projects: {
                status: null
            },
        },
    }),
    computed: mapState(['enums'])
};
</script>
