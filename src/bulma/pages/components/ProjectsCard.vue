<template>
    <card collapsible
          class="is-rounded raises-on-hover has-margin-bottom-large">
        <card-header class="has-background-light">
            <template v-slot:title>
                <fa class="icon is-small has-margin-right-small"
                    icon="project-diagram"/>
                Projects
            </template>
            <template v-slot:controls>
                <card-refresh @refresh="fetch()"/>
                <card-collapse/>
            </template>
        </card-header>
        <card-content class="has-padding-medium">
            <transition-group v-if="projects.length > 0" name="projects"
                tag="div">
                <project v-for="(projectStatus, index) in projects"
                    class="project"
                    :key="projectStatus.project.id"
                    :project="projectStatus.project"
                    :statuses="projectStatus.statuses"
                    @updated="remove(index)"/>
            </transition-group>
            <p v-else
               class="has-text-centered is-bold is-italic">
               Congratulations Everything is fine ;-)
            </p>
        </card-content>
    </card>
</template>

<script>

import { library } from '@fortawesome/fontawesome-svg-core';
import {
    Card, CardHeader, CardContent, CardRefresh, CardCollapse,
} from '@enso-ui/card/bulma';
import { faProjectDiagram } from '@fortawesome/free-solid-svg-icons';
import Project from './Project.vue';

library.add([faProjectDiagram]);

export default {
    name: 'Index',

    components: {
        Project, Card, CardHeader, CardContent, CardRefresh, CardCollapse,
    },

    inject: ['route'],

    data: () => ({
        projects: [],
    }),

    created() {
        this.fetch();
    },

    methods: {
        fetch() {
            axios.get(this.route('projects.updatable')).then(({ data }) => {
                this.projects = data;
            });
        },
        remove(index) {
            this.projects.splice(index, 1);
        },
    },
};

</script>

<style lang="scss" scoped>
    .project {
        transition: all 0.5s;
    }

    .projects-move {
        transition: item transform 0.333s;
    }

    .projects-enter, .projects-leave-to {
        opacity: 0;
    }
</style>
