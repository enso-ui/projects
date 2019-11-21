const CostCenterCreate = () => import('../../../pages/administration/costCenters/Create.vue');

export default {
    name: 'administration.costCenters.create',
    path: 'create',
    component: CostCenterCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create Cost Center',
    },
};
