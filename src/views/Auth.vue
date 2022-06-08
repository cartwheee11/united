<template>
  <div class="container askjhdkjashd" v-if="state == 'loading'">
    <Spinner />
  </div>
  <div v-else-if="state == 'bad login'" class="readable-container text-block">
    <h3 style="margin: 0">ошибка входа</h3>
    <p>
      Для того, чтобы войти на сайт, необходимо состоять в нашем дискорд-сервере
    </p>
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
      if (!accessToken) {
        console.log("че-то пошло не так");
      }
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

  .readable-container {
    padding: 50px;
    margin-top: 50px;
    margin-bottom: 50px;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
</style>
