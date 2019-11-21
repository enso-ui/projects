const BusinessDomainCreate = () => import('../../../pages/administration/businessDomains/Create.vue');

export default {
    name: 'administration.businessDomains.create',
    path: 'create',
    component: BusinessDomainCreate,
    meta: {
        breadcrumb: 'create',
        title: 'Create Business Domain',
    },
};
