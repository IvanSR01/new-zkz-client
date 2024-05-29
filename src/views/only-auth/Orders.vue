<script>
// Страница всех отчетов
import Wrapper from "../../components/ui/Wrapper.vue"; // Импортируем компонент обертки
import orderService from "../../service/order-service/order.service"; // Импортируем сервис для работы с заказами
import { toast } from "vue3-toastify"; // Импортируем библиотеку для уведомлений
import { errorCatch } from "../../api/api.helpers"; // Импортируем помощник для обработки ошибок
import { RouterLink } from "vue-router"; // Импортируем компонент для ссылок на маршруты


export default {
  components: {
    Wrapper, // Регистрируем компонент обертки
  },
  
  mounted() {
    this.getData(); // Вызываем метод получения данных при монтировании компонента
  },
  
  data() {
    return {
      data: [], // Определяем состояние компонента
    };
  },
  
  methods: {
    // Метод для установки данных
    setData(data) {
      this.data = data; // Устанавливаем данные в состояние компонента
    },
    
    // Асинхронный метод для получения данных
    async getData() {
      try {
        const res = await orderService.getOrders(); // Запрашиваем заказчиков с сервера
        this.setData(res.orders); // Устанавливаем полученные  заказчиков в состояние
      } catch (error) {
        console.log(error); // Логируем ошибку
        toast.error(errorCatch(error)); // Показ уведомления об ошибке
      }
    },
    
    // Асинхронный метод для удаления заказа
    async deleteOrder(id) {
      try {
        const res = await orderService.deleteOrder(id); // Отправляем запрос на удаление Заказчика
        toast.success(res.message); // Показ уведомления об успешном удалении
        this.getData(); // Обновляем данные после удаления
      } catch (e) {
        console.log(e); // Логируем ошибку
        toast.error(errorCatch(e)); // Показ уведомления об ошибке
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
