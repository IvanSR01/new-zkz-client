// Файл tokens.cookie.js содержит функции для работы с токенами в cookies
// Импорт библиотеки Cookies из модуля js-cookie
import Cookies from "js-cookie";

// Функция для получения токенов из cookies
const getTokens = () => ({
  accessToken: Cookies.get("access-token"), // Получение access-токена из cookies
  refreshToken: Cookies.get("refresh-token"), // Получение refresh-токена из cookies
});

// Функция для сохранения токенов в cookies
const saveTokens = ({ accessToken, refreshToken }) => {
  Cookies.set("access-token", accessToken); // Установка access-токена в cookies
  Cookies.set("refresh-token", refreshToken); // Установка refresh-токена в cookies
};

// Функция для удаления токенов из cookies
const removeTokens = () => {
  Cookies.remove("access-token"); // Удаление access-токена из cookies
  Cookies.remove("refresh-token"); // Удаление refresh-токена из cookies
};

// Экспорт функций getTokens, saveTokens и removeTokens для использования в других модулях
export { getTokens, saveTokens, removeTokens };
