export default [
    {
        path: '/',
        component: () => import('@Page/Home.vue')
    },
    {
        path: '/about',
        component: () => import('@Page/About.vue')
    }
];