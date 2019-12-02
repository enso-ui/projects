<template>
    <div class="columns is-centered">
        <div class="column is-three-quarters animated fadeIn">
            <enso-form ref="form"
                class="box has-background-light raises-on-hover animated fadeIn"/>
        </div>
    </div>
</template>

<script>

import { EnsoForm } from '@enso-ui/bulma';

export default {
    name: 'Edit',

    components: { EnsoForm },
};

</script>
