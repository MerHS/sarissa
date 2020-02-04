import { RouteConfig } from 'vue-router';

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: '', 
        component: () => import('components/pages/Index.vue') 
      }, 
      {
        path: 'editor/:projectId',
        component: () => import('components/editor/EditorLayout.vue')
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('components/pages/Error404.vue')
  });
}

export default routes;
