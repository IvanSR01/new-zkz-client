<script>
// Страница для обновления заказа
import Wrapper from "../../components/ui/Wrapper.vue"; // Импортируем компонент Wrapper
import Button from "../../components/ui/Button.vue"; // Импортируем компонент Button
import orderService from "../../service/order-service/order.service"; // Импортируем сервис для работы с заказами
import { toast } from "vue3-toastify"; // Импортируем библиотеку для уведомлений
import { errorCatch } from "../../api/api.helpers"; // Импортируем помощник для обработки ошибок

export default {
  components: {
    Wrapper, // Регистрируем компонент Wrapper
    Button, // Регистрируем компонент Button
  },
  mounted() {
    this.getOrder(); // Вызываем метод получения данных при монтировании компонента
  },
  data() {
    return {
      fullName: "", // Инициализируем поле для хранения полного имени
      address: "", // Инициализируем поле для хранения адреса
      date: "", // Инициализируем поле для хранения даты
    };
  },
  methods: {
    // Асинхронный метод для обновления заказа
    async updateOrder() {
      try {
        const res = await orderService.updateOrder({
          fullName: this.fullName, // Передаем полное имя из состояния
          address: this.address, // Передаем адрес из состояния
          date: this.date, // Передаем дату из состояния
          id: this.$route.params.id, // Передаем ID заказа из параметров маршрута
        });
        toast.success(res.message); // Показ уведомления об успешном обновлении
      } catch (error) {
        toast.error(errorCatch(error)); // Показ уведомления об ошибке
      }
    },
    // Асинхронный метод для получения данных заказа по ID
    async getOrder() {
      try {
        const { order } = await orderService.getById(this.$route.params.id); // Получаем заказ по ID
        this.fullName = order.fullName; // Устанавливаем полученное полное имя в состояние
        this.address = order.address; // Устанавливаем полученный адрес в состояние
        const date = new Date(order.date); // Преобразуем строку даты в объект Date
        const year = date.getFullYear(); // Получаем год из даты
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Получаем месяц из даты, добавляем ведущий ноль
        const day = String(date.getDate()).padStart(2, "0"); // Получаем день из даты, добавляем ведущий ноль
        this.date = `${year}-${month}-${day}`; // Форматируем дату в строку и устанавливаем в состояние
      } catch (error) {
        toast.error(errorCatch(error)); // Показ уведомления об ошибке
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
