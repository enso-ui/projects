import routeImporter from '@core/modules/importers/routeImporter';

const routes = routeImporter(require.context('./businessDomains', false, /.*\.js$/));
const RouterView = () => import('@core/bulma/pages/Router.vue');

export default {
    path: 'businessDomains/',
    component: RouterView,
    meta: {
        breadcrumb: 'business domains',
        route: 'administration.businessDomains.index',
    },
    children: routes,
};
