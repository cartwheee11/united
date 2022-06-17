<template>
  <div>
    <div class="container main-screen">
      <img v-for="image in images" :key="image.url" :src="image.url" alt="" />
    </div>

    <div @click="loadImagesChunk" class="container load-mode-screen">
      <div v-if="this.after" style="text-align: center" class="">
        <button>Загрузить еще</button>
      </div>
    </div>
  </div>
</template>

<script>
  import * as api from "../api.js";
  export default {
    data() {
      return {
        images: [],
        after: undefined,
      };
    },

    mounted() {
      this.loadImagesChunk();
    },

    methods: {
      loadImagesChunk() {
        api.gallery.getImages(20, this.after).then(async (result) => {
          console.log(result);

          let newChunk = await result.data.map((elem) => elem.data);

          console.log(newChunk);
          this.after = result.after;

          this.images = this.images.concat(newChunk);
        });
      },
    },
  };
</script>

<style scoped>
  .main-screen {
    display: grid;
    margin-top: 30px;
    margin-bottom: 30px;
    grid-template-columns: 1fr 1fr;
    grid-gap: 30px;
  }

  .load-mode-screen {
    margin-bottom: 30px;
  }

  img {
    border-radius: 10px;
  }

  @media screen and (max-width: 850px) {
    .main-screen {
      grid-template-columns: 1fr;
      gap: 15px;
      margin-top: 15px;
    }
  }
</style>
