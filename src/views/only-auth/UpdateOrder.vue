<script>
import Wrapper from "../../components/ui/Wrapper.vue";
import Button from "../../components/ui/Button.vue";
import orderService from "../../service/order-service/order.service";
import { toast } from "vue3-toastify";
import { errorCatch } from "../../api/api.helpers";
export default {
  components: {
    Wrapper,
    Button,
  },
  mounted() {
    this.getOrder();
  },
  data() {
    return {
      fullName: "",
      address: "",
      date: "",
    };
  },
  methods: {
    async updateOrder() {
      try {
        const res = await orderService.updateOrder({
          fullName: this.fullName,
          address: this.address,
          date: this.date,
          id: this.$route.params.id,
        });
        toast.success(res.message);
      } catch (error) {
        toast.error(errorCatch(error));
      }
    },
    async getOrder() {
      try {
        const { order } = await orderService.getById(this.$route.params.id);
        this.fullName = order.fullName;
        this.address = order.address;
        const date = new Date(order.date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        this.date = `${year}-${month}-${day}`;
      } catch (error) {
        toast.error(errorCatch(error));
      }
    },
  },
};
</script>

<template>
  <Wrapper>
    <div class="content">
      <div class="form">
        <h1>Обновить заказчика</h1>
        <input v-model="fullName" placeholder="ФИО" class="form-input" />
        <input v-model="address" placeholder="Адресс" class="form-input" />
        <input
          type="date"
          v-model="date"
          placeholder="Дата"
          class="form-input"
        />
        <Button :click="updateOrder">Обновить</Button>
      </div>
    </div>
  </Wrapper>
</template>

<style lang="scss" scoped>
.content {
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .form {
    h1 {
      margin: 0;
      font-size: 35px;
      color: #000;
    }
    box-sizing: border-box;
    width: 80vw;
    max-width: 450px;
    padding: 20px 25px;

    border-radius: 10px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 25px;
    @media (max-width: 600px) {
      width: 90vw;
      padding: 20px 15px;
    }
    .form-input {
      width: 100%;
      outline: none;
      border: none;
      background-color: #f2f2f2;
      padding: 15px 22px;
      font-size: 18px;
      border-radius: 10px;
      color: #000;
      box-sizing: border-box;
    }
  }
}
</style>
