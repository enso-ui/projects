<template>
    <thead>
        <tr class="has-background-light project-line-header">
            <th class="index">
                #
            </th>
            <th>
                {{ i18n('Project') }}
            </th>
            <th class="amount">
                {{ i18n('Amount') }}
            </th>
            <th class="small"/>
        </tr>
    </thead>
</template>

<script>
export default {
    name: 'HeaderLine',

    inject: ['i18n'],
};
</script>

<style lang="scss">
    tr.project-line-header {
        th {
            text-align: center !important;

            &.amount {
                width: 10em;
            }

            &.index {
                width: 3%;
            }

            &.small {
                width: 15%;
            }
        }
    }
</style>
