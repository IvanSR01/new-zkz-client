<script>
import { RouterView } from "vue-router";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import userService from "./service/user-service/user.service";
import { getTokens } from "./shared/cookie/tokens.cookie";
export default {
  components: { Header, Footer },
  mounted() {
    this.checkAuth(this.$route.fullPath, this.$router.push);
    this.getInfoUser();
  },
  methods: {
    async getInfoUser() {
      const res = await userService.getProfile(this.$store);
      this.$store.commit("setUser", res);
    },
    checkAuth(p, push) {
      const { refreshToken } = getTokens();
      if (p.includes("/auth") && refreshToken) {
        push({ path: "/" });
      } else if (p.includes("/d") && !refreshToken) {
        push({ path: "/auth/login" });
        toast.error("Пользователь не авторизован");
      }
    },
  },
};
</script>

<template>
  <div class="app">
    <Header />
    <div class="sub"><RouterView></RouterView></div>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .sub {
    min-height: 80vh;
  }
}
</style>
