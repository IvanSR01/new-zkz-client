<script>
import Wrapper from "../../components/ui/Wrapper.vue";
import orderService from "../../service/order-service/order.service";
import { toast } from "vue3-toastify";
import { errorCatch } from "../../api/api.helpers";
import { RouterLink } from "vue-router";
const data = [];

export default {
  components: {
    Wrapper,
  },
  mounted() {
    this.getData();
  },
  data() {
    return {
      data,
    };
  },
  methods: {
    setData(data) {
      this.data = data;
    },
    async getData() {
      try {
        const res = await orderService.getOrders();
        this.setData(res.orders);
      } catch (error) {
        console.log(error);
        toast.error(errorCatch(error));
      }
    },
		async deleteOrder(id){ 
			try{
				const res = await orderService.deleteOrder(id);
				toast.success(res.message);
				this.getData();
			} catch(e) {
				console.log(e)
				toast.error(errorCatch(e))
			}
		}
  },
};
</script>

<template>
  <Wrapper>
		<div :class="{ content: true, empty: !data.length }">
			<div v-if="!data.length">Заказчиков пока нет</div>
      <div class="order" v-for="(item, index) in data">
        <p>Заказчик {{ item.fullName }}</p>
        <div class="buttons">
          <RouterLink :to="`/d/order/${item._id}`">edit</RouterLink>
          <p @click="() => deleteOrder(item._id)">remove</p>
        </div>
      </div>
    </div>
  </Wrapper>
</template>

<style lang="scss" scoped>
.content {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  .order {
    width: 100%;
    height: 50px;
    border-radius: 20px;
    background-color: #fff;
    padding: 5px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // box-sizing: border-box;
    font-size: 20px;
    cursor: pointer;
    font-weight: 500;
    transition: box-shadow 0.5s;
    .buttons {
      display: flex;
      align-items: center;
      gap: 10px;
			a {
				color: #000;
				text-decoration: none;
			}
      p, a {
        padding: 3px 5px;
        border-radius: 10px;
        transition: background-color 0.3s;
      }
      p:hover , a:hover{
        background-color: #cbcbcb8d;
      }
    }
  }
  .order:hover {
    box-shadow: 0 10px 20px #e7e7e7;
  }
}
.empty {
	height: 80vh;
  align-items: center;
	font-size: 30px;
}
</style>
