import routeImporter from '@core/modules/importers/routeImporter';

const routes = routeImporter(require.context('./projects', false, /.*\.js$/));
const RouterView = () => import('@core/bulma/pages/Router.vue');

export default {
    path: '/projects',
    component: RouterView,
    meta: {
        breadcrumb: 'projects',
        route: 'projects.index',
    },
    children: routes,
};
