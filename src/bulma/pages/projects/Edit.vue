<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters animated fadeIn">
            <enso-form ref="form"
                class="box has-background-light raises-on-hover animated fadeIn"
                @loaded="initialised = true"/>
        </div>
        <split-fields v-if="initialised"
            whole
            :form="$refs.form"
            :section="1"
            field-source="costCenterList"
            pivot-key="cost_center_id"/>
    </div>
</template>

<script>

import { EnsoForm } from '@enso-ui/bulma';
import SplitFields from '../../components/SplitFields.vue';

export default {
    components: { EnsoForm, SplitFields },

    data() {
        return {
            initialised: false,
        };
    },
};

</script>
