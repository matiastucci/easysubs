export default [
  {
    path: '/home',
    name: 'home',
    component: require('components/Home'),
  },
  {
    path: '/videos',
    name: 'videos',
    component: require('components/VideosList'),
  },
  {
    path: '/settings',
    name: 'settings',
    component: require('components/Settings'),
  },
  {
    path: '/info',
    name: 'info',
    component: require('components/Info'),
  },
  {
    path: '*',
    redirect: '/home',
  },
]
