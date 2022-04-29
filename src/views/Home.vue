<template>
  <!-- https://telegra.ph/chto-to-04-16 -->
  <!-- <div class="event-section">
    <div class="container">
      <p>Текущее событие</p>
      <br />
      <h1>United</h1>
      <br />
      <button @click="$router.push('/about')">Узнать</button>
    </div> -->
  <!-- </div> -->

  <div class="container">
    <Slide />
  </div>

  <div class="news-section">
    <div class="container"></div>
  </div>
</template>

<script>
  // @ is an alias to /src
  // import Slide from "@wyhaya/vue-slide";
  import * as api from "../api.js";
  export default {
    name: "Home",

    data() {
      return {
        slide: [],
        user: null,
      };
    },

    mounted() {
      let authString = window.localStorage.getItem("auth");
      if (authString) {
        api.auth(authString).then((res) => {
          console.log(res);
          window.localStorage.setItem("user", JSON.stringify(res));
          this.user = res;
          this.$store.commit("setUser", res);
        });
      }

      // api.gallery.getImages(0, 10);
    },
  };
</script>

<style scoped>
  .news-section .container {
    position: grid;
  }
</style>
