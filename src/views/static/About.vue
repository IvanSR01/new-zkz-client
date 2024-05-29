<script>
// Импорт компонентов Header и Wrapper из соответствующих файлов
import Header from "../../components/Header.vue";
import Wrapper from "../../components/ui/Wrapper.vue";

export default {
  components: {
    Header,
    Wrapper,
  },
};
</script>

<template>
  <div class="color"></div>
  <!-- Wrapper компонент, содержащий информацию "О нас" -->
  <Wrapper>
    <div class="about">
      <!-- Первая колонка -->
			<div class="col">
        <h2>We is lorem</h2>
        <p>
          We team is good Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Incidunt quidem enim quisquam quos explicabo quis aliquid,
          fugiat labore debitis quo magnam magni veniam quod perferendis iure
          sapiente consectetur? Sunt, consequuntur. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Ipsa tempore vel nam repellendus
          adipisci, eos rem doloribus totam fugit voluptatem sed maxime commodi
          incidunt dignissimos, labore, repellat laudantium iure soluta! Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Nam iusto dicta
          ratione fugiat incidunt repellendus praesentium inventore blanditiis
          sapiente earum sit, enim, eius reiciendis quam molestias natus eum.
          Reprehenderit, laboriosam? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Harum ipsum distinctio, illo magni animi ab sequi at
          aperiam exercitationem deserunt sunt doloribus earum officiis
          repudiandae, quos necessitatibus fuga! Vel, sapiente.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          quidem enim quisquam quos explicabo quis aliquid, fugiat labore
          debitis quo magnam magni veniam quod perferendis iure sapiente
          consectetur? Sunt, consequuntur.
        </p>
      </div>
      <div class="col">
        <h2>We is lorem</h2>
        <p>
          We team is good Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Incidunt quidem enim quisquam quos explicabo quis aliquid,
          fugiat labore debitis quo magnam magni veniam quod perferendis iure
          sapiente consectetur? Sunt, consequuntur. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Ipsa tempore vel nam repellendus
          adipisci, eos rem doloribus totam fugit voluptatem sed maxime commodi
          incidunt dignissimos, labore, repellat laudantium iure soluta! Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Nam iusto dicta
          ratione fugiat incidunt repellendus praesentium inventore blanditiis
          sapiente earum sit, enim, eius reiciendis quam molestias natus eum.
          Reprehenderit, laboriosam? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Harum ipsum distinctio, illo magni animi ab sequi at
          aperiam exercitationem deserunt sunt doloribus earum officiis
          repudiandae, quos necessitatibus fuga! Vel, sapiente.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          quidem enim quisquam quos explicabo quis aliquid, fugiat labore
          debitis quo magnam magni veniam quod perferendis iure sapiente
          consectetur? Sunt, consequuntur.
        </p>
      </div>
    </div>
  </Wrapper>
</template>

<style lang="scss" scoped>
/* Стили для элемента color */
.color {
  height: 50px;
  width: 100%;
  background-color: #425d6f;
}

/* Стили для блока about */
.about {
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  border-radius: 20px;
  @media (max-width: 1000px) {
    flex-wrap: wrap;
  }
  /* Стили для колонок */
  .col {
    width: 49%;
    @media (max-width: 1000px) {
      width: 100%;
    }
    /* Стили для заголовка h2 */
    h2 {
      margin: 0;
      font-size: 35px;
    }
    /* Стили для параграфа p */
    p {
      font-size: 20px;
      text-align: justify;
      font-weight: 500;
    }
  }
}
</style>
