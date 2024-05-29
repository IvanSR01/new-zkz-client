import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router";
import "./style.css";
import Vue3Toastify from "vue3-toastify";
import 'vue3-toastify/dist/index.css';
import store from "./store/store";
createApp(App)
  .use(router)
	.use(store)
  .use(Vue3Toastify, {
    autoClose: 3000,
  })
  .mount("#app");
