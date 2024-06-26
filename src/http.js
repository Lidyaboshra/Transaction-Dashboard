import axios from "axios";
import store from "./store/store";

const $domain_api = URL;
const base = axios.create({
    baseURL: $domain_api,
});
base.interceptors.request.use(
    (config) => {
        store.dispatch("setLoaderStatus", true);
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        store.dispatch("setLoaderStatus", false);
        return Promise.reject(error);
    }
);
base.interceptors.response.use(
    (response) => {
        store.dispatch("setLoaderStatus", false);
        return Promise.resolve(response);
    },
    (error) => {
        store.dispatch("setLoaderStatus", false);
        const { status, data } = error.response;
        if (status === 403 || status === 401) {
            localStorage.clear();
            location.reload();
            router.push("/signin");
        } else if (status === 404) {
            router.push("/404");
        }
        return Promise.reject(error);
    }
);

export default base;