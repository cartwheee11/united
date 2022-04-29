<template>
  <p v-if="state == 'loading'">Загрузка...</p>
  <p v-else-if="state == 'bad login'">Ошибка</p>
  <p v-else>Успех, редирект</p>
</template>

<script>
  import * as api from "../api.js";
  export default {
    name: "Auth",
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

      console.log(accessToken, tokenType);

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

      //   fetch("https://discord.com/api/users/@me", {
      //     headers: {
      //       authorization: `${tokenType} ${accessToken}`,
      //     },
      //   })
      //     .then((res) => res.json())
      //     .then((res) => {
      //       console.log(res);
      //       window.localStorage.setItem("auth", res);
      //       this.$router.push("/");
      //     });
    },
  };
</script>
