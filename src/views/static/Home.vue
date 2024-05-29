<script>
// Главная страница
// Импорт компонента Wrapper из соответствующего файла
import Wrapper from "../../components/ui/Wrapper.vue";

export default {
  components: {
    Wrapper,
  },
};
</script>

<template>
  <!-- Использование компонента Wrapper -->
  <Wrapper>
    <div class="home">
      <div class="aside">
        <h2>Lorem is good idea</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          voluptate commodi officia laborum saepe tenetur eveniet, sunt aut
          facere praesentium voluptates explicabo assumenda reprehenderit sed
          aliquid aperiam blanditiis delectus! Corporis!
        </p>
      </div>
      <div class="article">
        <h2>Why lorem is good idea?</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe
          maiores voluptas illo a, suscipit repudiandae fuga assumenda iste
          tempora, harum ducimus modi perspiciatis sint ex error in eaque
          nesciunt nihil. Lorem ipsum dolor sit, amet consectetur adipisicing
          elit. Nisi quam facilis eaque qui blanditiis dignissimos laudantium
          tempora, numquam nam omnis facere officia neque ipsum eligendi,
          dolorem rem dolore at ipsam! Lorem ipsum dolor sit, amet consectetur
          adipisicing elit. Ex quae dolores quam rem quas sapiente iste, magni
          quaerat repellendus, a dicta numquam nostrum, voluptate incidunt
          assumenda porro neque! In, itaque. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Omnis soluta deserunt, nobis atque est a
          nulla impedit earum accusantium amet corrupti ut qui, harum, fugit
          rerum. Sequi ratione optio assumenda? Lorem ipsum dolor sit amet
          consectetur adipisicing elit. A culpa dolore sint iste ullam provident
          esse soluta quis at omnis, vel necessitatibus quia minus quos
          voluptates totam, accusamus quaerat tenetur? Lorem ipsum dolor sit,
          amet consectetur adipisicing elit. Nisi dicta temporibus aspernatur
          eligendi illum tempora. Aliquam eos culpa assumenda eaque illum! Sunt
          rem iusto officiis ad dignissimos sed doloremque necessitatibus? Lorem
          ipsum dolor sit amet consectetur, adipisicing elit. Perferendis, et
          fugiat. Esse possimus corrupti explicabo beatae inventore maiores
          dolorum vero! Sit nulla molestiae fuga tempora quod, incidunt ipsum
          veniam laboriosam.
        </p>
      </div>
      <div class="aside">
        <h2>Why lorem is bad idea?</h2>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellat
          voluptate commodi officia laborum saepe tenetur eveniet, sunt aut
          facere praesentium voluptates explicabo assumenda reprehenderit sed
          aliquid aperiam blanditiis delectus! Corporis!
        </p>
      </div>
    </div>
  </Wrapper>
</template>

<style lang="scss" scoped>
/* Стили для компонента home */
.home {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
	padding: 20px 0px;
}

/* Стили для блока aside */
.aside {
  width: 100%;
  height: 400px;
  background: url("/public/12.png") center no-repeat;
  background-size: cover;
  border-radius: 20px;
  color: #fff;
  display: flex;
  justify-content: flex-end;
  flex-direction: column;
  padding: 20px;
  box-sizing: border-box;
}

/* Стили для заголовка h2 */
.aside h2 {
  font-size: 30px;
  margin: 0;
  @media (max-width: 600px) {
    font-size: 25px;
  }
}

/* Стили для текста параграфа p */
.aside p {
  width: 90%;
  font-size: 18px;
  @media (max-width: 600px) {
    font-size: 15px;
  }
}

/* Стили для блока article */
.article {
  padding-top: 25px;
}

/* Стили для заголовка h2 в блоке article */
.article h2 {
  margin: 0;
  font-size: 35px;
}

/* Стили для текста параграфа p в блоке article */
.article p {
  font-size: 20px;
  text-align: justify;
}
</style>
