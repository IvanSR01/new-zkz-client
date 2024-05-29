<template>
  <!-- Компонент кнопки, который принимает слот для контента и обрабатывает клик по кнопке -->
  <button class="button" @click="this.click">
    <slot />
  </button>
</template>

<script>
export default {
  name: "Button", // Имя компонента

  // Определяем пропс для компонента, который принимает функцию для обработки клика
  props: ["click"],
};
</script>

<style lang="scss" scoped>
/* Стили для кнопки */
.button {
  width: 100%; /* Задает ширину кнопки */
  outline: none; /* Убирает обводку */
  border: none; /* Убирает рамку */
  background-color: #161616; /* Цвет фона */
  padding: 15px 20px; /* Внутренний отступ */
  font-size: 18px; /* Размер шрифта */
  border-radius: 10px; /* Скругление углов */
  font-weight: bold; /* Жирный шрифт */
  color: #ffff; /* Цвет текста */
  cursor: pointer; /* Курсор в виде руки при наведении */
}
</style>
