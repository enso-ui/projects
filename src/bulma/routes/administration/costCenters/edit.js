const CostCenterEdit = () => import('../../../pages/administration/costCenters/Edit.vue');

export default {
    name: 'administration.costCenters.edit',
    path: ':costCenter/edit',
    component: CostCenterEdit,
    meta: {
        breadcrumb: 'edit',
        title: 'Edit Cost Center',
    },
};
