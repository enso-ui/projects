import routeImporter from '@core/modules/importers/routeImporter';

const routes = routeImporter(require.context('./costCenters', false, /.*\.js$/));
const RouterView = () => import('@core/bulma/pages/Router.vue');

export default {
    path: 'costCenters/',
    component: RouterView,
    meta: {
        breadcrumb: 'cost centers',
        route: 'administration.costCenters.index',
    },
    children: routes,
};
