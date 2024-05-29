<script>
import { RouterLink } from "vue-router";
import { toast } from "vue3-toastify";
import authService from "../service/auth-service/auth.service";
import { errorCatch } from "../api/api.helpers";
import Button from "../components/ui/Button.vue";
export default {
  components: {
    Button,
  },
  data() {
    return {
      email: "",
      fullName: "",
      number: "",
      password: "",
    };
  },
  methods: {
    async submit() {
      try {
        const res = await authService.register({
          email: this.email,
          password: this.password,
          fullName: this.fullName,
          number: this.number,
        });
        this.$store.commit("setUser", res);
        toast.success("Вы зарегистрировались");
        this.$router.push({ path: "/" });
      } catch (error) {
        console.log(error);
        toast.error(errorCatch(error));
      }
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <div class="content">
      <h1>Регистрация</h1>
      <input class="form-input" v-model="email" placeholder="E-mail" />
      <input class="form-input" v-model="fullName" placeholder="ФИО" />
      <input
        class="form-input"
        v-model="number"
        placeholder="Номер удостоверения"
      />
      <input class="form-input" v-model="password" placeholder="Пароль" />
      <Button :click="submit" class="button">Регистрация</Button>
      <RouterLink to="/auth/login" class="link">Или вход</RouterLink>
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
