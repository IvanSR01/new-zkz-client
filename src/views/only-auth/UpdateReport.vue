<script>
// Страница для обновления отчета
// Импортируем необходимые модули и компоненты
import Wrapper from "../../components/ui/Wrapper.vue";
import Button from "../../components/ui/Button.vue";
import orderService from "../../service/order-service/order.service";
import reportService from "../../service/report-service/report-service";
import { toast } from "vue3-toastify";
import { errorCatch } from "../../api/api.helpers";

export default {
  components: {
    Wrapper, // Регистрируем компонент Wrapper
    Button,  // Регистрируем компонент Button
  },

  // Определяем начальное состояние данных
  data() {
    return {
      name: "", // Имя отчета
      date: "", // Дата отчета
      company: "", // Компания
      subCompany: "", // Подразделение компании
      object: "", // Объект отчета
      dateLicense: "", // Дата лицензии
      dateOverLicense: "", // Дата окончания лицензии
      addressObject: "", // Адрес объекта
      selectOrder: {}, // Выбранный заказ
      orders: [], // Список заказов
    };
  },

  // Хук жизненного цикла, вызываемый при монтировании компонента
  mounted() {
    this.getOrders(); // Получаем список заказов
    this.getData(); // Получаем данные отчета
  },

  methods: {
    // Метод для обновления отчета
    async updateOrder() {
      try {
        const res = await reportService.updateReport({
          id: this.$route.params.id, // ID отчета из параметров маршрута
          name: this.name, // Имя отчета
          date: this.date, // Дата отчета
          company: this.company, // Компания
          subCompany: this.subCompany, // Подразделение компании
          object: this.object, // Объект отчета
          dateLicense: this.dateLicense, // Дата лицензии
          dateOverLicense: this.dateOverLicense, // Дата окончания лицензии
          addressObject: this.addressObject, // Адрес объекта
          orderId: this.selectOrder, // ID выбранного заказа
        });
        toast.success(res.message); // Показ уведомления об успешном обновлении
      } catch (error) {
        console.log(errorCatch(error)); // Логирование ошибки
        toast.error(errorCatch(error)); // Показ уведомления об ошибке
      }
    },

    // Метод для получения данных отчета по ID
    async getData() {
      try {
        const res = await reportService.getById(this.$route.params.id);
        // Заполняем данные отчета
        this.name = res.report.name;
        this.company = res.report.title.company;
        this.subCompany = res.report.title.subCompany;
        this.object = res.report.title.object;
        this.addressObject = res.report.title.addressObject;
        this.date = this.changeDate(res.report.date); // Форматируем дату
        this.dateLicense = this.changeDate(res.report.title.dateLicense); // Форматируем дату лицензии
        this.dateOverLicense = this.changeDate(res.report.title.dateOverLicense); // Форматируем дату окончания лицензии
        // Получаем данные заказа по ID
        const res2 = await orderService.getById(res.report.orderId);
        this.selectOrder = res2.order._id; // Устанавливаем ID выбранного заказа
      } catch (error) {
        console.log(error); // Логирование ошибки
      }
    },

    // Метод для получения списка заказов
    async getOrders() {
      try {
        const res = await orderService.getOrders();
        this.orders = res.orders; // Устанавливаем список заказов
      } catch (error) {
        console.log(error); // Логирование ошибки
        toast.error(errorCatch(error)); // Показ уведомления об ошибке
      }
    },

    // Метод для форматирования даты в строку "ГГГГ-ММ-ДД"
    changeDate(resDate) {
      const date = new Date(resDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
  },
};

</script>

<template>
  <Wrapper>
    <div class="content">
      <div class="form">
        <h1>Обновить отчет</h1>
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
		max-height: 700px;
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
