const ProjectEdit = () => import('../../pages/projects/Edit.vue');

export default {
    name: 'projects.edit',
    path: ':project/edit',
    component: ProjectEdit,
    meta: {
        breadcrumb: 'edit',
        title: 'Edit Project',
    },
};
