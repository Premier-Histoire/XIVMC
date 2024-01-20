import "mdb-vue-ui-kit/css/mdb.min.css";
import { inject } from '@vercel/analytics';

import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";

createApp(App).use(router).use(inject).mount("#app");
