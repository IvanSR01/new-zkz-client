// Импортируем необходимые модули и функции
import axios from "axios";
import { getTokens, removeTokens } from "../shared/cookie/tokens.cookie";
import { errorCatch } from "./api.helpers";
import authService from "../service/auth-service/auth.service";

// Устанавливаем базовый URL для API
export const baseURL = "http://localhost:4200";

// Создаем экземпляр axios с базовым URL для обычных запросов
export const api = axios.create({
  baseURL: `${baseURL}/api/v1`,
});

// Создаем экземпляр axios с базовым URL для запросов, требующих авторизации
export const accessApi = axios.create({
  baseURL: `${baseURL}/api/v1`,
});

// Добавляем интерсептор к запросам для добавления токена авторизации
accessApi.interceptors.request.use((config) => {
  // Получаем токен доступа из cookies
  const { accessToken } = getTokens();
  // Если токен существует, добавляем его в заголовки запроса
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
  return config;
});

// Добавляем интерсептор к ответам для обработки ошибок авторизации
accessApi.interceptors.response.use(
  (config) => config, // Возвращаем конфигурацию, если нет ошибок
  async (error) => {
    const originalRequest = error.config; // Сохраняем оригинальный запрос
    // Проверяем, если ошибка связана с авторизацией и это не повторный запрос
    if (
      (error.response?.status === 401 ||
        errorCatch(error) === "jwt expired" ||
        errorCatch(error) === "jwt must be provided") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true; // Помечаем запрос как повторный
      try {
        // Пытаемся получить новые токены
        const res = await authService.getNewTokens();
        // Повторяем оригинальный запрос с новыми токенами
        return accessApi.request(originalRequest);
      } catch (e) {
        // Если ошибка связана с истечением срока действия токена, удаляем токены из cookies
        if (errorCatch(e) === "jwt expired") removeTokens();
      }
    }
    // Если произошла другая ошибка, выбрасываем ее
    throw error;
  }
);

