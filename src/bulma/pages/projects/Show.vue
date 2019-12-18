<template>
<div class="columns is-centered">
        <div class="column is-three-fifths animated fadeIn">
            <accessories>
                <template slot-scope="{ count }">
                    <tab id="Discussions"
                        keep-alive>
                        <discussions :id="parseInt($route.params.project, 10)"
                            ref="discussions"
                            controls
                            type="LaravelEnso\Projects\app\Models\Project"
                            @update="$set(count, 'discussions', $refs.discussions.count)"/>
                    </tab>
                </template>
            </accessories>
        </div>
    </div>
</template>

<script>
import { Accessories, Tab, Discussions } from '@enso-ui/bulma';

export default {
    components: { Accessories, Tab, Discussions },
};
</script>

<style lang="scss">
</style>
