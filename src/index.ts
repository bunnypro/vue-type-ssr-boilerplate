import Vue from 'vue';
import { sync } from 'vuex-router-sync';
import App from '@Component/App.vue';
import createRouter from './router';
import createStore from './store';
import './styles/app.css';

const createApp = () => {
    const router = createRouter();
    const store = createStore();

    sync(store, router);

    const app = new Vue({
        router,
        store,
        render: h => h(App)
    })

    return { app, router, store };
}

export default createApp;