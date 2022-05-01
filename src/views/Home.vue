<template>
  <div>
    <div class="container title-section">
      <p class="emoji">{{ emojis[currentEmoji] }}</p>
      <h1>
        Unided
        <!-- {{ emojis[(currentEmoji + 1) % emojis.length] }} -->
      </h1>
      <p class="subtitle">
        №1 гильдия сервера
        <span
          ><a style="color: white" href="http://restartcraft.ru"
            >Restart Craft</a
          ></span
        ><br />
        Вступай в наши ряды, если готов :з
      </p>
      <br />
      <p><button>Заявка</button></p>
    </div>

    <div class="gallery-section">
      <swiper
        :modules="modules"
        :effect="'coverflow'"
        :grab-cursor="true"
        :slides-per-view="1.2"
        :centered-slides="true"
        :space-between="1"
        @swiper="onSwiper"
        :pagination="{ clickable: true }"
        :navigation="true"
        @slideChange="onSlideChange"
        :coverflow-effect="{
          rotate: 0,
          depth: 300,
          modifier: 3,
          slideShadows: true,
        }"
      >
        <swiper-slide
          class="swiper-slide"
          v-for="image in gallery"
          :key="image"
        >
          <img class="slider-image" :src="image" alt="" />
        </swiper-slide>
      </swiper>
    </div>

    <div class="players-section">
      <div class="container">
        <h2>Участники</h2>
      </div>
    </div>
  </div>
</template>

<script>
  // import * as api from "../api.js";
  import { Pagination, EffectCoverflow, Autoplay, Navigation } from "swiper";
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";

  // Import Swiper styles
  import "swiper/swiper.min.css";
  import "swiper/modules/pagination/pagination.min.css";
  import "swiper/modules/navigation/navigation.min.css";
  export default {
    name: "Home",

    components: { Swiper, SwiperSlide },

    data() {
      return {
        slide: [],
        modules: [Pagination, EffectCoverflow, Autoplay, Navigation],
        user: null,
        gallery: [
          "https://cdn.discordapp.com/attachments/886994065906892841/947783953622917130/2022-02-27_13.51.56.png",
          "https://cdn.discordapp.com/attachments/886994065906892841/950249420207829012/HishipyOnBike.png",

          "https://cdn.discordapp.com/attachments/886994065906892841/938949542001393725/2022-02-04_02.02.56.png",
          "https://cdn.discordapp.com/attachments/886994065906892841/938950501985312798/2022-01-22_03.png",
          "https://cdn.discordapp.com/attachments/886994065906892841/938948058048266251/unknown.png",
          "https://cdn.discordapp.com/attachments/886994065906892841/929860182798913546/unknown.png",
        ],
        emojis: [
          "🥰",
          "💣",
          "❤️",
          "🖤",
          "💜",
          "🔥",
          "🐇",
          "🦔",
          "🐒",
          "🦍",
          "🦧",
          "🍌",
          "🥦",
          "🥬",
          "🍅",
          "🥒",
          "🍩",
          "🥕",
        ],
        currentEmoji: 0,
      };
    },

    mounted() {
      this.startHeartAnimation();

      // api.gallery.getImages().then((res) => {
      // this.gallery = res.data.map((elem) => elem.data);
      // console.log(this.gallery);
      // });
    },

    methods: {
      startHeartAnimation() {
        setInterval(() => {
          this.currentEmoji = Math.floor(
            Math.random() * (this.emojis.length - 0.0001)
          );
        }, 100);
      },
    },
  };
</script>

<style scoped>
  .swiper-slide {
    /* display: flex; */
    /* vertical-align: middle; */
    flex-grow: 1;
    /* height: 100% !important; */
    /* display: inline-block; */
    align-content: center;
  }
  .slider-image {
    /* vertical-align: middle; */
  }

  .emoji {
    margin-top: 0;
    font-size: 50px;
  }
  .title-section.container {
    /* max-width: 900px; */
    text-align: center;
  }
  h1 {
    font-size: 100px;
    text-align: center;
    margin-top: 0;
  }

  .subtitle {
    font-size: 30px;
    /* font-family: "Montserrat"; */
    /* font-weight: 600; */
  }

  .subtitle a {
    color: white;
    background: orange;
    border-radius: 20px;
    padding: 0 10px;
    white-space: nowrap;
    border: none;
    display: inline-block;
    transition: 0.2s;
  }

  h1 span {
    transition: 0.2s;
  }

  .slider-image {
    border-radius: 10px;
  }

  .subtitle a:hover {
    border: none;
    transform: translate(0px, -5px) scale(1.1) rotate(3deg);
  }

  .gallery-section {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  @media screen and (max-width: 850px) {
    h1 {
      font-size: 50px;
      text-align: center;
      margin-top: 0;
    }

    .subtitle {
      font-size: 20px;
    }
  }
</style>

<style>
  .swiper {
    /* padding-top: 120px; */
    /* padding-bottom: 120px; */
    /* transform: scale(2) !important; */
  }

  .swiper-wrapper {
    align-items: center;
  }

  .swiper-slide-visible {
    /* transition: 0.2s !important; */
  }
  .swiper-slide-active {
  }
</style>
