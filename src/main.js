import './assets/main.css'

import App from "./App.vue";
import { createApp } from "vue";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import router from "./router";
import store from "./store/store";
import { dataService } from "./services/data-service";


const app = createApp(App);
app.config.globalProperties.$dataService = dataService;


app.use(router);
app.use(store);

app.mount("#app");