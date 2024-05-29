// Файл маршрутизатора для определения роутов в приложении
import { createRouter, createWebHistory } from "vue-router";
// Определение маршрутов
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/static/Home.vue"), // Маршрут для главной страницы
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/static/About.vue'), // Маршрут для страницы "О нас"
  },
  {
    path: '/prices',
    name: 'prices',
    component: () => import('../views/static/Prices.vue'), // Маршрут для страницы с ценами
  },
  {
    path: "/auth/login",
    name: "login",
    component: () => import("../views/Login.vue"), // Маршрут для страницы логина
  },
  {
    path: "/auth/register",
    name: "register",
    component: () => import("../views/Register.vue"), // Маршрут для страницы регистрации
  },
  {
    path: "/d/orders",
    name: "orders",
    component: () => import("../views/only-auth/Orders.vue"), // Маршрут для страницы заказов (только для авторизованных)
  },
  {
    path: "/d/reports",
    name: "reports",
    component: () => import("../views/only-auth/Reports.vue"), // Маршрут для страницы отчетов (только для авторизованных)
  },
  {
    path: "/d/reports/:id",
    name: "report",
    component: () => import("../views/only-auth/Report.vue"), // Маршрут для просмотра конкретного отчета (только для авторизованных)
  },
  {
    path: "/d/reports/edit/:id",
    name: "edit-report",
    component: () => import("../views/only-auth/UpdateReport.vue"), // Маршрут для редактирования конкретного отчета (только для авторизованных)
  },
  {
    path: "/d/new-report",
    name: "new-report",
    component: () => import("../views/only-auth/NewReport.vue"), // Маршрут для создания нового отчета (только для авторизованных)
  },
  {
    path: "/d/new-protocol/:reportId",
    name: "protocol",
    component: () => import("../views/only-auth/NewProtocol.vue"), // Маршрут для создания нового протокола для конкретного отчета (только для авторизованных)
  },
  {
    path: "/d/new-order",
    name: "new-order",
    component: () => import("../views/only-auth/NewOrder.vue"), // Маршрут для создания нового заказа (только для авторизованных)
  },
  {
    path: "/d/order/:id",
    name: "order",
    component: () => import("../views/only-auth/UpdateOrder.vue"), // Маршрут для редактирования конкретного заказа (только для авторизованных)
  },
];

// Создание экземпляра маршрутизатора
const router = createRouter({
  history: createWebHistory(), // Использование истории браузера
  routes, // Указание маршрутов
});



export default router