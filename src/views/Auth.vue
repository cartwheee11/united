<template>
  <div class="container askjhdkjashd" v-if="state == 'loading'">
    <Spinner />
  </div>
  <div v-else-if="state == 'bad login'" class="container">
    <div class="readable-container info-block text-block">
      <h3 style="margin: 0">Ошибка входа</h3>
      <p>
        Для того, чтобы войти на сайт, необходимо состоять в нашем
        дискорд-сервере
      </p>
    </div>
  </div>
</template>

<script>
  import * as api from "../api.js";
  import Spinner from "../components/Spiner.vue";
  export default {
    name: "Auth",
    components: { Spinner },
    data() {
      return {
        state: "loading",
      };
    },

    mounted() {
      const fragment = new URLSearchParams(window.location.hash.slice(1));
      const [accessToken, tokenType] = [
        fragment.get("access_token"),
        fragment.get("token_type"),
      ];

      api.auth(tokenType + " " + accessToken).then((res) => {
        if (res.username) {
          this.state = "success";
          window.localStorage.setItem("user", JSON.stringify(res));
          window.localStorage.setItem("auth", tokenType + " " + accessToken);
          this.$store.commit("setUser", res);
          this.$router.push("/");
        } else {
          this.state = "bad login";
        }
      });
    },
  };
</script>

<style scoped>
  .askjhdkjashd {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    vertical-align: middle;
  }
</style>
