import createApp from './index';

const { app, router, store } = createApp();

if ((<any>window).__INITIAL_STATE__) {
    store.replaceState((<any>window).__INITIAL_STATE__)
}

router.onReady(() => {
    app.$mount('#app');
});