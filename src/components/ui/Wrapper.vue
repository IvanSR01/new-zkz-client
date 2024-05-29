<script>
// Пустой объект export default для компонента
export default {};
</script>

<template>
  <!-- Основная разметка компонента -->
  <div class="wrapper">
    <!-- Контейнер для контента, который передается через слот -->
    <div class="content"><slot /></div>
  </div>
</template>

<style lang="scss" scoped>
/* Стили для компонента */
.wrapper {
  width: 100vw; /* Задает ширину контейнера равную ширине окна просмотра */
  display: flex; /* Использует Flexbox для выравнивания дочерних элементов */
  justify-content: center; /* Центрирует содержимое по горизонтали */

  .content {
    width: 80vw; /* Ширина контента составляет 80% от ширины окна просмотра */
    max-width: 1300px; /* Максимальная ширина контента */
    @media (max-width: 600px) {
      width: 95vw; /* Для экранов шириной менее 600px, ширина контента составляет 95% */
    }
  }
}
</style>
