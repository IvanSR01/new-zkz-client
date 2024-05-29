<script>
import Wrapper from "./ui/Wrapper.vue"; // Импортируем компонент Wrapper
export default {
  components: {
    Wrapper, // Регистрируем компонент Wrapper
  },
};
</script>

<template>
  <!-- Используем компонент Wrapper для обертки содержимого -->
  <Wrapper>
    <div class="footer">
      <!-- Элемент item для логотипа и текста -->
      <div class="item">
        <h2>Logo</h2>
        <p>2024 © Все права защищены</p>
      </div>
      <!-- Ссылка на главную страницу с использованием RouterLink -->
      <RouterLink to="/">Главная</RouterLink>
    </div>
  </Wrapper>
</template>

<style lang="scss" scoped>
.footer {
  width: 100%; /* Ширина footer на 100% */
  padding: 20px 20px; /* Внутренние отступы */
  box-sizing: border-box; /* Включает padding и border в общую ширину и высоту элемента */
  display: flex; /* Flexbox для выравнивания дочерних элементов */
  align-items: center; /* Центрирование элементов по вертикали */
  justify-content: space-between; /* Распределение пространства между элементами */

  h2 {
    font-size: 40px; /* Размер шрифта для заголовка */
    @media (max-width: 600px) {
      font-size: 20px; /* Уменьшение размера шрифта на маленьких экранах */
    }
    margin: 0; /* Убирает отступы */
  }

  .item {
    display: flex; /* Flexbox для выравнивания дочерних элементов */
    align-items: center; /* Центрирование элементов по вертикали */
    gap: 20px; /* Расстояние между элементами */
  }

  a {
    color: #000; /* Цвет текста ссылки */
    text-decoration: none; /* Убирает подчеркивание ссылки */
    font-size: 18px; /* Размер шрифта для ссылки */
  }
}
</style>
