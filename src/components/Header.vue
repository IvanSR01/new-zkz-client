<script>
import Wrapper from "./ui/Wrapper.vue"; // Импортируем компонент Wrapper
import Button from "./ui/Button.vue"; // Импортируем компонент Button
import { RouterLink } from "vue-router"; // Импортируем компонент RouterLink из vue-router
import { getTokens, removeTokens } from "../shared/cookie/tokens.cookie"; // Импортируем функции для работы с токенами

export default {
  components: {
    Wrapper, // Регистрируем компонент Wrapper
    Button, // Регистрируем компонент Button
    RouterLink, // Регистрируем компонент RouterLink
  },
  data() {
    return {
      // Ссылки для авторизованных пользователей
      links: [
        {
          text: "Заказы",
          link: "/d/orders",
        },
        {
          text: "Отчеты",
          link: "/d/reports",
        },
        {
          text: "Новый заказчик",
          link: "/d/new-order",
        },
        {
          text: "Новый отчет",
          link: "/d/new-report",
        },
      ],
      // Ссылки для неавторизованных пользователей
      noAuthLink: [
        {
          text: "Главная",
          link: "/",
        },
        {
          text: "Цены",
          link: "/prices",
        },
        {
          text: "О нас",
          link: "/about",
        },
        {
          text: "Вход",
          link: "/auth/login",
        },
      ],
    };
  },
  methods: {
    // Метод для выхода из аккаунта
    logout() {
      this.$store.commit('setUser', null); // Обнуляем данные пользователя в хранилище Vuex
      removeTokens(); // Удаляем токены из cookies
    },
  },
};
</script>

<template>
  <!-- Используем компонент Wrapper для обертки содержимого -->
  <Wrapper>
    <header class="header">
      <!-- Логотип, по клику переход на главную страницу -->
      <div class="logo" @click="() => this.$router.push('/')">LOGO</div>
      <!-- Ссылки для авторизованных пользователей -->
      <div class="links" v-if="this.$store.state.userData">
        <RouterLink class="link" v-for="link in links" :to="link.link">
          {{ link.text }}
        </RouterLink>
        <!-- Ссылка для выхода из аккаунта -->
        <a class="link" @click="logout">Выход</a>
      </div>
      <!-- Ссылки для неавторизованных пользователей -->
      <div v-if="!this.$store.state.userData" class="links">
        <RouterLink class="link" v-for="link in noAuthLink" :to="link.link">
          {{ link.text }}
        </RouterLink>
      </div>
    </header>
  </Wrapper>
</template>

<style lang="scss" scoped>
.header {
  display: flex; /* Flexbox для выравнивания дочерних элементов */
  align-items: center; /* Центрирование элементов по вертикали */
  justify-content: space-between; /* Распределение пространства между элементами */
  flex-wrap: wrap; /* Перенос элементов на новую строку при необходимости */
  width: 100%; /* Ширина header на 100% */
  height: 60px; /* Высота header */
  padding: 10px 0px; /* Внутренние отступы */
  .logo {
    cursor: pointer; /* Изменение курсора при наведении на логотип */
    font-size: 40px; /* Размер шрифта для логотипа */
    @media (max-width: 600px) {
      font-size: 20px; /* Уменьшение размера шрифта на маленьких экранах */
    }
    font-weight: bold; /* Жирное начертание шрифта */
  }
  .links {
    display: flex; /* Flexbox для выравнивания дочерних элементов */
    gap: 20px; /* Расстояние между элементами */
    font-size: 20px; /* Размер шрифта для ссылок */
    .link {
      color: #000; /* Цвет текста ссылки */
      text-decoration: none; /* Убирает подчеркивание ссылки */
      transition: text-decoration 0.3s; /* Плавный переход для подчеркивания */
    }
    .link:hover {
      text-decoration: underline; /* Подчеркивание ссылки при наведении */
    }
    @media (max-width: 800px) {
      font-size: 15px; /* Уменьшение размера шрифта на маленьких экранах */
      gap: 10px; /* Уменьшение расстояния между элементами на маленьких экранах */
    }
  }
}
</style>
