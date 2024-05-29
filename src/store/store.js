// Импорт функции createStore из библиотеки Vuex
import { createStore } from 'vuex'

// Создание и экспорт хранилища Vuex
export default createStore({
  // Состояние хранилища
  state: {
    userData: null // Данные пользователя (по умолчанию null)
  },
  // Мутации - функции для изменения состояния
  mutations: {
    // Мутация для установки данных пользователя
    setUser: (state, action) => {
      state.userData = action // Установка данных пользователя
    }
  }
})
