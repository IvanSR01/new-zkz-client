// Эта функция предназначена для обработки ошибок, возвращаемых сервером.
// В зависимости от структуры ошибки, она возвращает соответствующее сообщение об ошибке.

export const errorCatch = (error) => {
  // Проверяем, если у ошибки есть объект response (ответ от сервера)
  if (error.response) {
    const response = error.response;
    const data = response.data;

    // Проверяем наличие данных в ответе
    if (data) {
      // Проверяем, есть ли в данных поле message
      if (data.message) {
        // Если поле message является массивом, возвращаем первое сообщение из массива
        if (typeof data.message === "object" && Array.isArray(data.message)) {
          return data.message[0];
        // Если поле message является строкой, возвращаем это сообщение
        } else if (typeof data.message === "string") {
          return data.message;
        }
      // Если данные являются массивом и содержат сообщения, возвращаем первое сообщение
      } else if (Array.isArray(data) && data.length > 0) {
        return data[0].msg;
      // Если данные являются строкой, возвращаем эту строку
      } else if (typeof data === "string") {
        return data;
      }
    }

    // Если структура данных не соответствует вышеописанным условиям, возвращаем статусный код
    return `Server responded with status code ${response.status}`;
  // Если у ошибки нет объекта response, но есть поле message, возвращаем это сообщение
  } else if (error.message) {
    return error.message;
  }

  // Если структура ошибки не соответствует вышеописанным условиям, возвращаем общее сообщение об ошибке
  return 'An unknown error occurred';
};
