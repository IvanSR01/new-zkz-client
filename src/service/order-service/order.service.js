import { accessApi } from '../../api/axios.api'; // Импортируем объект accessApi для выполнения HTTP-запросов с авторизацией

const orderService = {
  // Метод для получения всех заказов
  async getOrders() {
    const { data } = await accessApi.get("/order/all");
    return data;
  },

  // Метод для получения заказа по ID
  async getById(id) {
    const { data } = await accessApi.get(`/order/by-id/${id}`);
    return data;
  },

  // Метод для создания нового заказа
  async createOrder(credentials) {
    const { data } = await accessApi.post("/order/new", credentials);
    return data;
  },

  // Метод для обновления заказа
  async updateOrder(credentials) {
    const { data } = await accessApi.put(`/order/update/${credentials.id}`, credentials);
    return data;
  },

  // Метод для удаления заказа
  async deleteOrder(id) {
    const { data } = await accessApi.delete(`/order/delete/${id}`);
    return data;
  },
};

export default orderService; // Экспортируем объект orderService
