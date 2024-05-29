<script>
// Страница входа
// Импортируем компоненты
import { RouterLink } from "vue-router";
import { toast } from "vue3-toastify";
import authService from "../service/auth-service/auth.service";
import { errorCatch } from "../api/api.helpers";
import Button from "../components/ui/Button.vue";
export default {
  // Регистрация компонентов в локальном компоненте
  components: {
    Button,
  },

  data() {
    // Данные компонента
    return {
      login: "",
      password: "",
    };
  },

  // Методы
  methods: {
    // Метод ответа за запрос на авторизацию пользователя
    async submit() {
      try {
        const res = await authService.login({
          login: this.login,
          password: this.password,
        });
				// При успешной авторизации сохраняем пользователя в хранилище Vuex
				// Метод commit - коммитит изменения в хранилище, принимает два параметра (название мутации и ее аргументы)
        this.$store.commit("setUser", res);
				// Вывод сообщения об успешной авторизации
        toast.success("Вы вошли в аккаунт");
				// Переход на главную страницу
        this.$router.push({ path: "/" });
      } catch (error) {
        console.log(error);
				// Вывод сообщения об ошибке
        toast.error(errorCatch(error));
      }
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="content">
      <h1>Вход</h1>
      <input class="form-input" v-model="login" placeholder="Логин" />
      <input class="form-input" v-model="password" placeholder="Пароль" />
      <Button :click="submit" class="button" text="Вход">Вход</Button>
      <RouterLink to="/auth/register" class="link">Или Регистрация</RouterLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 80vh;
  .content {
    h1 {
      margin: 0;
      font-size: 35px;
      color: #000;
    }
    box-sizing: border-box;
    width: 80vw;
    max-width: 450px;
    padding: 20px 25px;

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
    .link {
      text-decoration: none;
      color: #000;
      font-weight: bold;
      font-size: 18px;
    }
  }
}
</style>
