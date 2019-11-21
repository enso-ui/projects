const ProjectShow = () => import('../../pages/projects/Show.vue');

export default {
    name: 'projects.show',
    path: ':id',
    component: ProjectShow,
    meta: {
        breadcrumb: 'show',
        title: 'Project Profile',
    },
};
