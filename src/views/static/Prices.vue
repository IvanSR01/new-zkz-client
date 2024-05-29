<script>
// Страница с ценами
import Wrapper from "../../components/ui/Wrapper.vue";
export default {
  components: {
    Wrapper,
  },
};
</script>

<template>
  <div class="color"></div>
  <Wrapper>
    <div class="about">
      <div class="col">
        <h2>Free sub</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nihil beatae
          explicabo corporis vero, sed voluptatibus quae facilis exercitationem
          dicta eligendi pariatur unde fugit, voluptatem enim ab similique,
          ipsam porro. Cumque.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          aspernatur, perferendis nemo illum facere ad. Incidunt asperiores
          nesciunt illo assumenda maxime id sed iusto rem, officiis molestias
          dolorum aliquid perferendis?
        </p>
      </div>
      <div class="col">
        <h2>Premium sub</h2>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Incidunt,
          labore ad animi placeat, accusamus dolores eaque maiores hic possimus
          sapiente exercitationem deserunt fugiat excepturi harum consequatur
          optio rem sequi vitae.
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          aspernatur, perferendis nemo illum facere ad. Incidunt asperiores
          nesciunt illo assumenda maxime id sed iusto rem, officiis molestias
          dolorum aliquid perferendis?
        </p>
      </div>
      <div class="col">
        <h2>Pro Max sub</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt
          dicta repellendus expedita quibusdam modi dolorem qui, beatae vitae
          porro ipsa aut voluptas est tempore, fugiat reiciendis veritatis hic
          perspiciatis nulla!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          aspernatur, perferendis nemo illum facere ad. Incidunt asperiores
          nesciunt illo assumenda maxime id sed iusto rem, officiis molestias
          dolorum aliquid perferendis?
        </p>
      </div>
    </div>
  </Wrapper>
</template>

<style lang="scss" scoped>
.color {
  height: 50px;
  width: 100%;
  background-color: #425d6f;
}
.about {
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50vh;
  border-radius: 20px;
  scrollbar-width: none;
  @media (max-width: 1000px) {
    flex-wrap: wrap;
  }
  .col {
    padding-right: 25px;
		border-right: 2px solid #858585;
    width: 30%;
    @media (max-width: 1000px) {
      width: 100%;
      border-right: none;
			padding-right: 0px;
    }
    h2 {
      margin: 0;
      font-size: 35px;
    }
    P {
      font-size: 20px;
      text-align: justify;
      font-weight: 500;
    }
  }
	.col:last-child {
		border: none;
		padding: 0px;
	}
}
</style>
