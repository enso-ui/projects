const BusinessDomainEdit = () => import('../../../pages/administration/businessDomains/Edit.vue');

export default {
    name: 'administration.businessDomains.edit',
    path: ':businessDomain/edit',
    component: BusinessDomainEdit,
    meta: {
        breadcrumb: 'edit',
        title: 'Edit Business Domain',
    },
};
