<template>
  <div class="app">
    <nav-bar />
    <div class="router-view-wrapper">
      <router-view />
    </div>

    <FooterElement />
  </div>
</template>

<script>
  import NavBar from "./components/NavBar.vue";
  import FooterElement from "./components/FooterElement.vue";
  export default {
    components: {
      FooterElement,
      NavBar,
    },
  };
</script>

<style>
  @import url("./assets/base.css");

  @font-face {
    font-family: s2p;
    src: url("/fonts/PressStart2p-Regular.ttf");
  }

  :root {
    --border-color: #dfdfdf;
  }

  body {
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    border-bottom: 3px #dfdfdf solid;
  }

  a:hover {
    border-bottom: 3px orange solid;
  }

  h1 {
    font-weight: 800;
  }

  button,
  input {
    border-radius: 10px;
    height: 50px;
  }

  input[type="text"] {
    border: 1px solid #dfdfdf;
    border-radius: 10px;
    background: none;
  }

  button {
    font-weight: 600;
    color: white;
    background-color: #000;
  }

  .text-block img {
    width: 100%;
    margin-top: 1em;
  }

  img {
    max-width: 100%;
  }

  figure {
    margin: 0;
  }

  p {
    font-family: helvetica;
  }

  a {
    font-family: helvetica;
  }

  .text-block p {
    font-size: 18px;
  }

  button:hover {
    background-color: #444;
  }

  .container {
    max-width: 1300px;
    /* width: 100%; */
    padding-left: 30px;
    padding-right: 30px;
    margin: 0 auto;
  }

  .readable-container {
    max-width: 800px;
    margin: 0 auto;
  }

  .swiper-button-next,
  .swiper-button-prev,
  .swiper-pagination-bullet-active {
    color: orange !important;
  }

  .swiper-pagination-bullet-active {
    background-color: orange !important;
  }

  @media screen and (max-width: 850px) {
    .container {
      padding-left: 15px;
      padding-right: 15px;
    }

    h1 {
      font-size: 35px;
    }

    h2 {
      font-size: 30px;
    }
  }
</style>

<style scoped>
  .app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  .router-view-wrapper {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    /* min-height: 100%; */
  }
</style>
