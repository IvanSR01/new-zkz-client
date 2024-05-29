import { accessApi } from "../../api/axios.api"; // Импортируем объект accessApi для выполнения HTTP-запросов с авторизацией

const protocolService = {
  // Метод для получения всех протоколов
  async getAll() {
    const { data } = await accessApi.get("/protocol/all");
    return data;
  },

  // Метод для получения протокола по ID
  async getById(id) {
    const { data } = await accessApi.get(`/protocol/by-id/${id}`);
    return data;
  },

  // Метод для создания нового протокола
  async createProtocol(credentials) {
    const { data } = await accessApi.post("/protocol/create", credentials);
    return data;
  },

  // Метод для удаления протокола
  async deleteProtocol(id) {
    const { data } = await accessApi.delete(`/protocol/delete/${id}`);
    return data;
  },

  // Метод для обновления протокола
  async updateProtocol(credentials) {
    const { data } = await accessApi.put(`/protocol/update/${credentials.id}`, credentials);
    return data;
  },

  // Метод для генерации таблицы из протокола
  async generateTable(credentials) {
    const { data } = await accessApi.post('/protocol/gen-table', credentials);
    return data;
  }
};

export default protocolService; // Экспортируем объект protocolService
