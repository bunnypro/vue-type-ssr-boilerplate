import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';

Vue.use(Vuex);

const createStore = () => {
    return new Vuex.Store({
        state
    });
};

export default createStore;