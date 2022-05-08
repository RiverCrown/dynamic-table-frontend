import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import TableBasePage from '../pages/TableBasePage.vue';
import FormViewPage from '../pages/FormViewPage.vue';
import TableViewPage from '../pages/TableViewPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/tableBase/:tableId',
    name: 'tableBase',
    component: TableBasePage,
    children: [
      {
        path: 'formView/:viewId',
        name: 'formView',
        component: FormViewPage,
        props: true,
      },
      {
        path: 'tableView/:viewId',
        name: 'tableView',
        component: TableViewPage,
        props: true,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
