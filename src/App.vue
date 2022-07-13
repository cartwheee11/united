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
  @import url("./assets/swalStyle.css");
  @import url("./assets/base.css");
  @import url("./assets/roles.css");
  @font-face {
    font-family: s2p;
    src: url("/fonts/PressStart2p-Regular.ttf");
  }

  :root {
    --border-color: #dfdfdf;
  }

  body {
    background-color: var(--c-body);
    min-height: 100vh;
  }

  a {
    text-decoration: none;
    border-bottom: 3px var(--c-underline) solid;
  }

  a:hover {
    border-bottom: 3px var(--c-accent) solid;
  }

  h1 {
    font-weight: 800;
    /* font-family: "Oswald"; */
  }

  button,
  input {
    /* border-radius: 10px; */
    height: 60px;
  }

  input[type="text"] {
    /* border: 3px solid var(--c-accent); */
    border-radius: 10px;
    padding: 0 22px;

    /* background-color: #fff; */
    background: var(--c-block);
  }

  .big-input {
    height: 70px;
  }

  button {
    font-weight: 600;
    color: white;
    background-color: var(--c-accent);
    border-radius: 10px;
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

  textarea {
    background-color: var(--c-block);
  }

  textarea:hover {
    background-color: var(--c-block);
  }

  hr {
    border: none;
    border-bottom: 3px solid var(--c-block);
    opacity: 1;
  }

  a {
    /* font-family: helvetica; */
  }

  .text-block p {
    font-size: 18px;
  }

  button:hover {
    background-color: var(--c-hover);
  }

  .container {
    max-width: 1300px;
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
    color: var(--c-accent) !important;
  }

  .swiper-pagination-bullet-active {
    background-color: orange !important;
  }

  button:disabled {
    opacity: 0.5;
  }

  input:disabled {
    opacity: 0.5;
  }

  .info-block {
    border-radius: 10px;
    padding: 50px;
    margin: 0 auto;
    margin-top: 20px;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 1px 6px 0 #0002;
    /* border: 1px solid var(--c-accent); */
    background: white;
  }

  @media screen and (max-width: 850px) {
    .container {
      padding-left: 15px;
      padding-right: 15px;
    }

    h1 {
      font-size: 40px;
    }

    h2 {
      font-size: 35px;
    }

    h3 {
      font-size: 28px;
    }

    @media screen and (max-width: 400px) {
      .info-block {
        padding: 15px;
      }
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
