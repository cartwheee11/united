<template>
  <div>
    <div class="main-wrapper">
      <div class="container title-section">
        <!-- <p class="emoji">{{ emojis[currentEmoji] }}</p> -->
        <div class="title-text">
          <h1>
            United.
            <br />го играть!
            <!-- {{ emojis[(currentEmoji + 1) % emojis.length] }} -->
          </h1>
          <!-- <p class="subtitle">
          №1 гильдия сервера
          <span
            ><a style="color: white" href="http://restartcraft.ru"
              >Restart Craft</a
            ></span
          ><br />
          Вступай в наши ряды, если готов :з
        </p>
        <br /> -->
          <p><button>Попроситься</button></p>
        </div>
      </div>

      <div class="players-section">
        <div class="container">
          <!-- <router-link to="/players"><h2>Участники</h2></router-link> -->
          <div v-if="!players.length" class="players-swiper-loading">
            <Spinner />
          </div>
          <swiper
            v-else
            class="players-swiper"
            :modules="modules"
            :grab-cursor="true"
            :slides-per-view="
              (() => {
                if (windowWidth > 1100) {
                  return 3.5;
                } else if (windowWidth > 600) {
                  return 2.5;
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

      <!-- <div class="gallery-section">
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
      </div> -->

      <div
        ref="galleryPreviewContainer"
        class="gallery-preview-section container"
      >
        <router-link class="gallery-preview-link" to="/gallery" style="">
          <img
            style="
              z-index: 4;
              left: 15%;
              top: 20%;
              width: 25%;
              position: absolute;
            "
            src="../assets/Oval1.png"
            alt=""
            id="gallery-preview"
          />
          <img
            ref="galleryPreviewBigImage"
            style="left: 25%; z-index: 3; width: 50%; position: absolute"
            src="../assets/Oval2.png"
            alt=""
            id="gallery-preview"
          />
          <img
            style="right: 20%; position: absolute; width: 15%; top: 40%"
            src="../assets/Oval3.png"
            alt=""
            id="gallery-preview"
          />

          <img
            src="../assets/галерея.png"
            style="
              left: 35%;
              position: absolute;
              width: 30%;
              top: 40%;
              z-index: 6;
            "
            alt=""
            id="gallery-preview"
          />
        </router-link>
      </div>

      <div class="tutorials-section container">
        <router-link to="/tutorials"><h2>Руководства</h2></router-link>
        <div v-if="!tutorials.length" class="slider-loading">
          <Spinner />
        </div>
        <!-- <div class="tutorials grid"> -->
        <Feed :routeBase="'/tutorials'" :publications="tutorials" />
        <!-- <router-link
            v-for="one in tutorials.slice(0, 5)"
            :key="one"
            style="border: none"
            :to="
              '/tutorials' + one.contentUrl.replace('https://telegra.ph', '')
            "
          >
            <img class="tutorial-image" :src="one.imageUrl" alt="" />

            <h3>{{ one.title }}</h3>
            <p>{{ one.description.slice(0, 101) }}...</p>
          </router-link> -->
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>

<script>
  const config = require("../config.json");
  import * as api from "../api.js";
  import Feed from "../components/Feed.vue";
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

    components: { Swiper, SwiperSlide, Spinner, Feed },

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

          this.tutorials.forEach(async (elem) => {
            // elem.authorName = await author
            // let name = await api.getUser
            let user = await api.getUserByIdFromDb(elem.author);
            user = user.data[0].data;
            elem.name = user.guildProfile.nick;
            elem.avatar = user.profile.avatar;

            // console.log(elem.avatar);
            // elem.authorId = user.profile.id;
          });
        });

      // api.gallery.getImages().then((res) => {
      // this.gallery = res.data.map((elem) => elem.data);
      // console.log(this.gallery);
      // });
      this.$refs.galleryPreviewBigImage.onload = () => {
        this.adaptGalleryPreviewContainer();
      };
    },

    methods: {
      adaptGalleryPreviewContainer() {
        const container = this.$refs.galleryPreviewContainer;
        const image = this.$refs.galleryPreviewBigImage;

        console.log(window.getComputedStyle(image).height);

        container.style.height = window.getComputedStyle(image).height;
      },

      onResize() {
        this.windowWidth = window.innerWidth;
        this.adaptGalleryPreviewContainer();
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
    /* position: absolute; */
    top: 0;
  }

  .slider-loading {
    height: 250px;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    margin-top: 20px;
    border-radius: 10px;
  }

  @keyframes players {
    from {
      /* border-width: 0px; */
      border-color: var(--c-accent);
    }

    50% {
      border-color: rgba(255, 255, 255, 0);
    }

    to {
      border-color: var(--c-accent);
    }
  }

  .players-swiper-loading {
    padding-top: 100px;
    padding-bottom: 100px;
    border: 3px var(--c-accent) solid;
    border-radius: 20px;
    animation: players 2s;
    animation-iteration-count: infinite;
  }

  .players-swiper {
    padding-top: 20px;
    padding-bottom: 20px;
  }

  .tutorials-section {
    margin-top: 100px;
  }

  .tutorials-section h2 {
    margin-bottom: 30px;
  }

  .tutorials-section .grid {
    margin-top: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px 30px;
  }

  .tutorials-section .grid h3 {
    margin-top: 25px;
  }

  .tutorials-section .container {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .tutorials-swiper {
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
    /* text-align: center; */
    /* height: calc(); */
    position: relative;
  }

  .title-section button {
    border-radius: 1000px;
    /* background-color: var(--с-accent-dark); */
    background: none;
    color: white;
    /* color: var(--c-accent); */
    background-color: var(--c-accent);
    /* border: 1px solid var(--c-accent); */
  }

  .title-section button:hover {
    /* background: rgb(81, 74, 74); */
  }

  .title-text {
    /* position: absolute; */
    /* margin-top: -20px; */
    /* bottom: -30px; */
  }

  h1 {
    font-size: 130px;
    /* text-align: left; */
    /* max-width: 1000px; */
    margin-top: 0;
  }

  h1 span {
    /* color: orange; */
    font-family: inherit;
    /* font-size: 120px; */
  }

  .subtitle {
    font-size: 30px;
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
    /* border-radius: 20px; */
  }

  .slider-image {
    /* border-radius: 10px; */
  }

  .subtitle a:hover {
    border: none;
    transform: translate(0px, -5px) scale(1.1) rotate(3deg);
  }

  .gallery-preview-section {
    margin-top: 100px;
    text-align: center;
    position: relative;
    /* height: 100vh; */
  }

  .gallery-preview-link:hover img {
    transform: scale(1.1);
  }

  .gallery-preview-link img {
    transition: 0.3s;
  }

  .gallery-preview-link:hover img:last-child {
    transform: scale(1);
  }

  .gallery-preview {
    position: absolute;
  }

  .gallery-preview-section a {
    border-bottom: none;
  }

  .gall .gallery-section {
    margin-top: 50px;
    margin-bottom: 50px;
  }

  .players-section {
    transform: skew(0deg, -5deg);
    /* overflow: hidden; */
    margin-bottom: 100px;
  }

  .players-section h2 {
    margin-top: 0;
  }

  .players-section h3 {
    margin-top: 150px;
  }

  .player-container {
    background-color: var(--c-accent);
    padding: 20px;
    /* color: white; */
    /* border: solid #dfdfdf 1px; */
    border-radius: 15px;
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

  .player-container h3,
  .player-container span {
    color: white;
  }

  .role {
    /* font-family: "Montserrat"; */
    /* font-weight: 600; */
  }

  .tutorial-image {
    /* height: 400px; */
    /* width: 100%; */
    /* width: auto; */
    border-radius: 10px;
  }

  @media screen and (max-width: 850px) {
    .title-section {
      text-align: center;
    }

    .tutorials-section .grid {
      grid-template-columns: 1fr;
    }

    h1 {
      font-size: 60px;
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

    .gallery-preview-section {
      transform: scale(1.3);
    }

    .main-wrapper {
      overflow: hidden !important;
      /* overflow- */
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

  .gallery-section .swiper-wrapper {
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
    background: var(--c-body);
    box-shadow: 0 0 100px 100px var(--c-body);
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
