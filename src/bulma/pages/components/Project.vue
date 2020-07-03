<template>
    <div class="project has-background-light raises-on-hover">
        <div>
            <div>
                <span>Project: </span>
                <strong>{{ project.name }}</strong>
            </div>
            <div class="has-margin-top-medium">
                <p class="desc">
                    Change status from
                    <strong class="current-status">
                        {{ enums.projectStatuses._get(project.status) }}
                    </strong>
                    to
                </p>
                <select class="is-medium status"
                    v-model="status">
                    <option v-for="status in statuses"
                        :key="status"
                        :value="status">
                        {{ enums.projectStatuses._get(status) }}
                    </option>
                </select>
            </div>
        </div>
        <div class="controls">
            <a class="button is-normal is-success has-margin-right-medium"
                @click="save">
                <span class="icon is-small">
                    <fa icon="check"/>
                </span>
            </a>
            <a class="button is-normal is-warning"
                @click="edit">
                <span class="icon is-small">
                    <fa icon="pencil-alt"/>
                </span>
            </a>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPencilAlt, faCheck } from '@fortawesome/free-solid-svg-icons';

library.add([faPencilAlt, faCheck]);

export default {
    name: 'Project',

    inject: ['route', 'toastr'],

    props: {
        project: {
            type: Object,
            required: true,
        },
        statuses: {
            type: Array,
            required: true,
        },
    },

    data: () => ({
        status: null,
    }),

    computed: mapState(['enums']),

    created() {
        [this.status] = this.statuses;
    },

    methods: {
        save() {
            axios.patch(this.route('projects.update', { project: this.project.id }), {
                ...this.project, status: this.status,
            }).then(({ data }) => {
                this.toastr.success(data.message);
                this.$emit('updated');
            });
        },
        edit() {
            this.$router.push({
                name: 'projects.edit',
                params: { project: this.project.id },
            });
        },
    },
};

</script>

<style lang="scss">
    .project {
        border-radius: 0.5em;
        padding: 0.4em;
        margin-top: 0.6em;
        margin-bottom: 0.4em;
        position: relative;

        .status{
            font-size: 0.9em;
        }
        .controls {
            position: absolute;
            right:10px;
            top: 14px;
        }
        .current-status {
            margin-left: 1px;
            margin-right: 1px;
        }
        .desc {
            display: inline-block;
            margin-right: 3px;
        }
    }
</style>
