<template>
  <div>
    <div class="main-wrapper">
      <div class="container title-section">
        <p class="emoji">{{ emojis[currentEmoji] }}</p>
        <h1>
          United
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
          :slides-per-view="windowWidth > 850 ? 1.5 : 1.1"
          :centered-slides="true"
          :space-between="1"
          :pagination="windowWidth > 850 ? { clickable: true } : false"
          :navigation="windowWidth < 850 ? false : true"
          :coverflow-effect="{
            rotate: 0,
            depth: 300,
            modifier: 3,
            slideShadows: false,
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
          <h2><router-link to="/players">Участники</router-link></h2>
          <div v-if="!players.length" class="slider-loading">
            <Spinner />
          </div>
          <swiper
            v-else
            class="players-swiper"
            :modules="modules"
            :grab-cursor="true"
            :slides-per-view="
              (() => {
                if (windowWidth > 800) {
                  return 2.5;
                } else if (windowWidth > 600) {
                  return 1.6;
                } else {
                  return 1.2;
                }
              })()
            "
            :space-between="20"
            :pagination="false"
            :navigation="true"
          >
            <swiper-slide
              class="player-container"
              v-for="player in players"
              :key="player"
            >
              <img width="128" :src="player.profile.avatar" alt="" />
              <div class="player-container-text">
                <h3>
                  {{
                    player.guildProfile.nick.slice(
                      0,
                      player.guildProfile.nick.indexOf("|")
                    )
                  }}
                </h3>
                <span>
                  {{
                    "Вступил " +
                    player.guildProfile["joined_at"].slice(
                      0,
                      player.guildProfile["joined_at"].indexOf("T")
                    )
                  }}
                </span>
                <div class="roles">
                  <template
                    v-for="role in player.guildProfile.roles.filter(
                      (elem) => roles[elem]
                    )"
                    :key="role"
                  >
                    <span
                      :style="{
                        background: 'var(--role-' + role + ')',
                        display: 'inline-block',
                        width: '10px',
                        height: '10px',
                        borderRadius: '10px',
                        marginRight: '10px',
                      }"
                    ></span
                    ><span class="role">{{ roles[role].name }}</span>
                  </template>
                </div>
              </div>
              <!-- <img class="slider-image" :src="image" alt="" /> -->
            </swiper-slide>
          </swiper>
        </div>
      </div>

      <div class="tutorials-section">
        <div class="container">
          <h2><router-link to="/tutorials">Руководства</router-link></h2>
          <div v-if="!tutorials.length" class="slider-loading">
            <Spinner />
          </div>
          <swiper
            v-else
            class="tutorials-swiper"
            :modules="modules"
            :grab-cursor="true"
            :slides-per-view="
              (() => {
                if (windowWidth > 800) {
                  return 2.5;
                } else if (windowWidth > 600) {
                  return 1.6;
                } else {
                  return 1.2;
                }
              })()
            "
            :space-between="20"
            :pagination="false"
            :navigation="true"
          >
            <swiper-slide
              class="tutorial-container"
              v-for="one in tutorials.slice(0, 5)"
              :key="one"
            >
              <router-link
                style="border: none"
                :to="
                  '/tutorials' +
                  one.contentUrl.replace('https://telegra.ph', '')
                "
              >
                <img class="tutorial-iamge" :src="one.imageUrl" alt="" />
                <h3>{{ one.title }}</h3>
                <p>{{ one.description.slice(0, 101) }}...</p>
              </router-link>
              <!-- <img class="slider-image" :src="image" alt="" /> -->
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const config = require("../config.json");
  import * as api from "../api.js";
  import Spinner from "../components/Spiner.vue";
  import {
    Pagination,
    EffectCoverflow,
    Autoplay,
    Navigation,
    Scrollbar,
  } from "swiper";
  // Import Swiper Vue.js components
  import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue";

  // Import Swiper styles
  import "swiper/swiper.min.css";
  import "swiper/modules/scrollbar/scrollbar.min.css";
  import "swiper/modules/pagination/pagination.min.css";
  import "swiper/modules/navigation/navigation.min.css";
  export default {
    name: "Home",

    components: { Swiper, SwiperSlide, Spinner },

    data() {
      return {
        slide: [],
        modules: [Pagination, EffectCoverflow, Autoplay, Navigation, Scrollbar],
        user: null,
        players: [],
        windowWidth: window.innerWidth,
        gallery: [
          "https://cdn.discordapp.com/attachments/886994065906892841/947783953622917130/2022-02-27_13.51.56.png",
          "https://cdn.discordapp.com/attachments/886994065906892841/950249420207829012/HishipyOnBike.png",

          "https://cdn.discordapp.com/attachments/886994065906892841/938949542001393725/2022-02-04_02.02.56.png",
          "https://cdn.discordapp.com/attachments/886994065906892841/938950501985312798/2022-01-22_03.png",
          "https://cdn.discordapp.com/attachments/886994065906892841/938948058048266251/unknown.png",
          "https://cdn.discordapp.com/attachments/886994065906892841/929860182798913546/unknown.png",
        ],
        roles: config.roles,
        tutorials: [],
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
      window.addEventListener("resize", this.onResize);
      // this.roles = require('./config.json')
      this.startHeartAnimation();
      api.getUsersFromDb().then((res) => {
        this.players = res.data.map((elem) => elem.data);
      });

      api
        .getTutorials({ userId: this.$store.state.user?.id })
        .then(async (res) => {
          this.tutorials = res.data.map((elem) => elem.data);
          console.log(this.tutorials);
        });
      // api.gallery.getImages().then((res) => {
      // this.gallery = res.data.map((elem) => elem.data);
      // console.log(this.gallery);
      // });
    },

    methods: {
      onResize() {
        this.windowWidth = window.innerWidth;
        console.log(window.innerWidth);
      },

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
  .main-wrapper {
    padding-bottom: 100px;
  }

  .slider-loading {
    height: 250px;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    margin-top: 20px;
    border-radius: 10px;
  }

  .players-swiper {
    padding-top: 20px;
    padding-bottom: 20px;
  }
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

  .gallery img {
    border-radius: 20px;
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

  .players-section {
    /* overflow: hidden; */
    margin-top: 100px;
    margin-bottom: 100px;
  }

  .players-section h2 {
    margin-top: 0;
  }

  .player-container {
    padding: 20px;
    border: solid #dfdfdf 1px;
    border-radius: 20px;
    transition: 0.2s;
  }

  .player-container:hover {
    /* transform: translateY(-15px); */
  }

  .player-container-text {
    display: inline;
  }

  .player-container img {
    margin-right: 20px;
    border-radius: 1000px;
  }

  .player-container h3 {
    /* margin-top: ; */
  }

  .role {
    /* font-family: "Montserrat"; */
    /* font-weight: 600; */
  }

  .tutorial-iamge {
    width: 100%;
    border-radius: 10px;
    margin-top: 10px;
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

    .players-section {
      margin-top: 50px;
      margin-bottom: 50px;
    }
  }

  @media screen and (max-width: 600px) {
    .player-container img {
      width: 70px;
    }
  }
</style>

<style>
  .swiper {
    /* padding-top: 120px; */
    /* padding-bottom: 120px; */
    /* transform: scale(2) !important; */
  }

  .players-section .swiper {
    /* overflow: visible; */
  }

  .swiper-wrapper {
    align-items: center;
  }

  .swiper-slide-visible {
    /* transition: 0.2s !important; */
  }
  .swiper-slide-active {
  }

  .players-section .swiper-button-next,
  .players-section .swiper-button-prev {
    height: 100%;
    top: 0;
    width: 50px;
    background: white;
    box-shadow: 0 0 100px 100px white;
    transition: 0.2s;
  }

  .players-section .swiper-button-disabled {
    opacity: 0;
  }

  @media screen and (max-width: 1000px) {
    .players-section .swiper-button-next,
    .players-section .swiper-button-prev {
      display: none;
      /* transition: 0.2s; */
    }
  }
</style>
