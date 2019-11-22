const ProjectShow = () => import('../../pages/projects/Show.vue');

export default {
    name: 'projects.show',
    path: ':project',
    component: ProjectShow,
    meta: {
        breadcrumb: 'show',
        title: 'Project Profile',
    },
};
