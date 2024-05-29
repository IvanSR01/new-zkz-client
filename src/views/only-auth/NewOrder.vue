<script>
// Импорт компонента Wrapper из соответствующего файла
import Wrapper from "../../components/ui/Wrapper.vue";
// Импорт компонента Button из соответствующего файла
import Button from "../../components/ui/Button.vue";
// Импорт службы orderService из соответствующего файла
import orderService from "../../service/order-service/order.service";
// Импорт функции toast из библиотеки vue3-toastify
import { toast } from "vue3-toastify";
// Импорт функции errorCatch из файла api.helpers
import { errorCatch } from "../../api/api.helpers";

export default {
  // Регистрация компонентов в локальном компоненте
  components: {
    Wrapper,
    Button,
  },

  // Определение данных компонента
  data() {
    return {
      fullName: "", // Имя заказчика
      address: "", // Адрес заказчика
      date: "", // Дата заказа
    };
  },

  // Определение методов компонента
  methods: {
    // Метод для создания нового заказчика
    async createOrder() {
      try {	
        // Вызов метода createOrder из службы orderService для создания заказа
        const res = await orderService.createOrder({
          fullName: this.fullName,
          address: this.address,
          date: this.date,
        });
        // Вывод сообщения об успешном создании заказчика
        toast.success("Заказчик создан");
        // Перенаправление на страницу с заказами
        this.$router.push("/d/order");
      } catch (error) {
        console.log(error);
        // Вывод сообщения об ошибке
        toast.error(errorCatch(error));
      }
    },
  },
};
</script>

<template>
  <!-- Вывод компонента Header -->
  <Header />
  <!-- Использование компонента Wrapper -->
  <Wrapper>
    <div class="content">
      <div class="form">
        <h1>Новый заказчик</h1>
        <!-- Поля для ввода данных заказчика -->
        <input v-model="fullName" placeholder="ФИО" class="form-input" />
        <input v-model="address" placeholder="Адресс" class="form-input" />
        <input
          type="date"
          v-model="date"
          placeholder="Дата"
          class="form-input"
        />
        <!-- Кнопка для создания заказчика -->
        <Button :click="createOrder">Создать</Button>
      </div>
    </div>
  </Wrapper>
</template>

<style lang="scss" scoped>
/* Стили для компонента content */
.content {
  height: 80vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* Стили для блока form */
  .form {
    /* Стили для заголовка h1 */
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
    /* Стили для полей ввода */
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
