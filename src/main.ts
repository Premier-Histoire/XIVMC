import "mdb-vue-ui-kit/css/mdb.min.css";

import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import MobileApp from "./MobileApp.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"

createApp(window.innerWidth <= 600 ? MobileApp : App) // 画面幅が600px以下の場合はMobileApp.vue、それ以外の場合はApp.vueを使用
  .use(router)
  .mount("#app");
