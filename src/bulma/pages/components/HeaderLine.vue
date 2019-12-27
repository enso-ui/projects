<template>
    <thead>
        <tr class="has-background-light split-line-header">
            <th class="index">
                #
            </th>
            <th>
                {{ i18n('Project') }}
            </th>
            <th class="split">
                {{ i18n('Split') }} (%)
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
    tr.split-line-header {
        th {
            text-align: center !important;

            &.split {
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
