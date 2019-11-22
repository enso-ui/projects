const ProjectShow = () => import('../../pages/projects/Show.vue');

export default {
    name: 'projects.show',
    path: ':project/edit',
    component: ProjectShow,
    meta: {
        breadcrumb: 'show',
        title: 'Project Profile',
    },
};
