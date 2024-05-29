// Импорт функции getTokens из модуля tokens.cookie в папке shared/cookie
import { getTokens } from "../../shared/cookie/tokens.cookie";
// Импорт функции accessApi из модуля axios.api
import { accessApi } from "../../api/axios.api";

// Определение объекта userService
const userService = {
  // Метод для получения профиля пользователя
  async getProfile() {
    // Извлечение refreshToken из токенов, полученных из cookies
    const { refreshToken } = getTokens();
    // Проверка наличия refreshToken
    if (refreshToken) {
      // Если refreshToken существует, выполнение GET-запроса к конечной точке '/user/profile'
      const { data } = await accessApi.get("/user/profile");
      // Возвращение данных профиля пользователя
      return data;
    }
    // Если refreshToken отсутствует, возвращение значения null
    return null;
  },
};

// Экспорт объекта userService для использования в других модулях
export default userService;
