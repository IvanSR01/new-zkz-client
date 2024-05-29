// Импортируем необходимые модули и стили
import { createApp } from "vue"; // Функция для создания приложения Vue
import App from "./App.vue"; // Основной компонент приложения
import router from "./router/router"; // Маршрутизатор приложения
import "./style.css"; // Общие стили приложения
import Vue3Toastify from "vue3-toastify"; // Пакет для уведомлений
import 'vue3-toastify/dist/index.css'; // Стили для уведомлений
import store from "./store/store"; // Хранилище состояния Vuex

// Создаем приложение Vue
createApp(App)
  .use(router) // Подключаем маршрутизатор
  .use(store) // Подключаем хранилище состояния Vuex
  .use(Vue3Toastify, {
    autoClose: 3000, // Настраиваем автоматическое закрытие уведомлений через 3000 миллисекунд
  })
  .mount("#app"); // Монтируем приложение на элемент с id "app"
