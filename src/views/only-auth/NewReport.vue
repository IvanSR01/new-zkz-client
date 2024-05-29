<script>
// Страница для создания нового отчета
import { toast } from "vue3-toastify"; // Импортируем библиотеку для уведомлений
import { errorCatch } from "../../api/api.helpers"; // Импортируем помощник для обработки ошибок
import Button from "../../components/ui/Button.vue"; // Импортируем компонент кнопки
import Wrapper from "../../components/ui/Wrapper.vue"; // Импортируем компонент обертки
import orderService from "../../service/order-service/order.service"; // Импортируем сервис для работы с заказами
import reportService from "../../service/report-service/report-service"; // Импортируем сервис для работы с отчетами

export default {
  components: {
    Wrapper,
    Button,
  },

  data() {
    return {
      // Данные компонента
      name: "",
      date: "",
      dateLicense: "",
      dateOverLicense: "",
      company: "",
      subCompany: "",
      object: "",
      addressObject: "",
      selectOrder: {},
      orders: [],
    };
  },

  // Хук жизненного цикла, вызывается после монтирования компонента
  mounted() {
    this.getOrders(); // Загружаем список заказчиков при монтировании компонента
  },

  methods: {
    // Метод для создания отчета
    async createReport() {
      try {
        // Отправляем данные отчета на сервер
        const res = await reportService.createReport({
          name: this.name,
          date: this.date,
          company: this.company,
          subCompany: this.subCompany,
          object: this.object,
          dateLicense: this.dateLicense,
          dateOverLicense: this.dateOverLicense,
          addressObject: this.addressObject,
          orderId: this.selectOrder,
        });
        toast.success(res.message); // Показ уведомления об успешном создании отчета
        this.$router.push("/d/reports"); // Переход на страницу со списком отчетов
      } catch (error) {
        console.log(errorCatch(error)); // Логируем ошибку
        toast.error(errorCatch(error)); // Показ уведомления об ошибке
      }
    },

    // Метод для получения списка заказов
    async getOrders() {
      try {
        // Получаем заказчиков с сервера
        const res = await orderService.getOrders();
        this.orders = res.orders; // Сохраняем заказчиков в состоянии компонента
      } catch (error) {
        console.log(error); // Логируем ошибку
        toast.error(errorCatch(error)); // Показ уведомления об ошибке
      }
    },
  },
};
</script>

<template>
  <Wrapper>
    <div class="content">
			<!-- Форма создания отчета -->
      <div class="form">
        <h1>Новый отчет</h1>
        <input
          v-model="name"
          placeholder="Название и номер отчета"
          class="form-input"
        />
        <input
          type="date"
          v-model="date"
          placeholder="Дата"
          class="form-input"
        />
        <input
          v-model="company"
          placeholder="Компания(Титул)"
          class="form-input"
        />
        <input
          v-model="subCompany"
          placeholder="Подкомпания(Титул)"
          class="form-input"
        />
        <input
          v-model="object"
          placeholder="Объект(Титул)"
          class="form-input"
        />
        <input
          v-model="addressObject"
          placeholder="Адресс обьекта(Титул)"
          class="form-input"
        />
        <input
          type="date"
          v-model="dateLicense"
          placeholder="Дата регистрации лицензии(Титул)"
          class="form-input"
        />
        <input
          type="date"
          v-model="dateOverLicense"
          placeholder="Действительно срок лицензии(Титул)"
          class="form-input"
        />
        <select
          class="form-input"
          aria-placeholder="Заказчик"
          v-model="selectOrder"
        >
          <option v-for="order in orders" :key="order.id" :value="order._id">
            {{ order.fullName }}
          </option>
        </select>

        <Button :click="createReport">Создать</Button>
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
    max-height: 700px;
    max-width: 450px;
    padding: 20px 25px;
    overflow-y: scroll;
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
