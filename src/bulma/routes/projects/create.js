const ProjectsCreate = () => import('../../pages/projects/Create.vue');

export default {
    name: 'projects.create',
    path: 'create',
    component: ProjectsCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create Projects',
    },
};
