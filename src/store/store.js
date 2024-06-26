import { createStore } from "vuex";

const store = createStore({
    state() {
        return {
            isLoading: false,
        };
    },
    getters: {
        getLoaderStatus: (state) => state.isLoading,
    },
    mutations: {
        SET_LOADER_STATUS: (state, isLoading) => (state.isLoading = isLoading),
    },
    actions: {
        setLoaderStatus: ({ commit }, isLoading) =>
            commit("SET_LOADER_STATUS", isLoading),
    }
});

export default store;