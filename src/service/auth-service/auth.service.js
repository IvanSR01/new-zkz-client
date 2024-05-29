import { api } from "../../api/axios.api"; // Импортируем объект api для выполнения HTTP-запросов
import { saveTokens, getTokens } from "../../shared/cookie/tokens.cookie"; // Импортируем функции для работы с токенами в cookies

const authService = {
  // Метод для входа пользователя
  async login(credentials) {
    // Отправляем POST-запрос на '/auth/login' с учетными данными
    const { data } = await api.post('/auth/login', credentials);
    // Сохраняем полученные токены
    this.addTokens(data);
    // Возвращаем данные ответа
    return data;
  },

  // Метод для регистрации пользователя
  async register(userDetails) {
    // Отправляем POST-запрос на '/auth/register' с данными пользователя
    const { data } = await api.post('/auth/register', userDetails);
    // Сохраняем полученные токены
    this.addTokens(data);
    // Возвращаем данные ответа
    return data;
  },

  // Метод для получения новых токенов с использованием refresh token
  async getNewTokens() {
    // Отправляем POST-запрос на '/auth/get-tokens' с refresh token
    const { data } = await api.post('/auth/get-tokens', {
      refreshToken: getTokens().refreshToken, // Получаем refresh token из cookies
    });
    // Сохраняем полученные токены
    this.addTokens(data);
    // Возвращаем данные ответа
    return data;
  },

  // Метод для сохранения токенов в cookies
  addTokens(data) {
    // Если данные содержат токены, сохраняем их
    if (data) {
      saveTokens({
        accessToken: data.accessToken, // Сохраняем access token
        refreshToken: data.refreshToken, // Сохраняем refresh token
      });
    }
  }
};

export default authService; // Экспортируем объект authService
