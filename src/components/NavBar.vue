<template>
  <div>
    <div style="display: block" ref="wrapper" class="nav-bar-wrapper">
      <nav :class="scrollingDown ? 'nav-scroll-down' : ''" ref="nav">
        <div class="container nav-bar-inner-wrapper">
          <button @click="onBurgerClick" class="burger">
            <img
              src="https://img.icons8.com/material-outlined/24/28d223/menu--v1.png"
            />
          </button>
          <router-link class="logo-link" to="/">
            <!-- <img class="logo" src="../assets/united-logo.png" alt=""/> -->
            <!-- <h2
              style="
                margin: 0;
                display: block !important;
                font-weight: 800;
                transform: translateY(4px);
              "
            >
              UN
            </h2> -->
            <img height="50" src="../assets/united-logo-small.png" alt="" />
          </router-link>
          <div
            class="menu"
            @click="onBurgerClick"
            :class="burgerClicked ? 'burger-clicked-menu' : ''"
          >
            <router-link to="/gallery">галерея</router-link>
            <router-link to="/tutorials">руководства</router-link>
            <router-link to="/about">о нас</router-link>
          </div>
          <!-- <router-link to="/about">список игроков</router-link> -->
          <!-- <router-link to="/tutorials">руководства</router-link> -->
          <div v-if="user" class="user-info">
            <!-- {{ JSON.parse(window.localStorage.getItem("user")) }} -->
            <img class="avatar" :src="`${$store.state.user.avatar}`" alt="" />
            <a href="#">{{ $store.state.user.guildProfile?.nick }}</a>
            <button class="log-out-button" @click="logOut">
              <img
                src="https://img.icons8.com/fluency-systems-filled/48/28d223/exit.png"
              />
            </button>
          </div>
          <a
            v-else
            @click="onLoginButtonClick"
            href="#"
            class="login-button user-info"
            ><button>войти</button></a
          >
          <!-- <button v-else @click=""></button> -->
        </div>
      </nav>
      <div
        ref="breadcrumb"
        :class="scrollingDown ? 'breadcrumb-scroll-down' : ''"
        v-if="$route.name != 'Home'"
        class="breadcrumb"
      >
        <div class="container breadcrumb-inner-wrapper">
          <span
            ><router-link to="/" style="opacity: 0.4">Главная</router-link
            ><span class="arrow-right"></span
          ></span>
          <span> {{ $route.name }}</span>
        </div>
      </div>
    </div>
    <div class="margin-element" :style="`height: ${margin}`"></div>
  </div>
</template>

<script>
  export default {
    props: {},

    data() {
      return {
        host: window.location.host,
        margin: 0,
        breadcrumbStyle: {},
        breadcrumbScrollDownStyle: {
          padding: 0,
          // paddingBottom: "10px",
          height: "50px",
        },
        breadcrumbTextStyle: {},
        breadcrumbScrollUpStyle: {},
        breadcrumbTextScrollDownStyle: {
          fontSize: "16px",
          margin: "0",
          fonstWeight: "100",
        },

        burgerClicked: false,

        scrollingDown: false,
      };
    },

    methods: {
      onLoginButtonClick() {
        this.$swal({
          title: "Воу-воу-воу",
          text: "приве",
          html: `
          <img src="/pimon.png"> 
          <p>Постой-ка, а ты уже есть в нашем дискордике o.O? Для того, чтобы мы могли это проверить, тебе нужно зайти на сайт через дискорд :з</p>
          <br/>
          <p>
            <a
              href="https://discord.com/api/oauth2/authorize?client_id=959075645118378085&redirect_uri=http%3A%2F%2F${window.location.host}%2Fauth&response_type=token&scope=identify%20guilds%20guilds.members.read"
            >
              <button focuse="false" style="padding: 5px !important; width: 100%;  background: #5a65f5 !important; color: white !important">
                <img width="35" style="padding: 5px !important; vertical-align: middle; margin-top: -2px" src="https://icon-library.com/images/discord-icon-white/discord-icon-white-1.jpg">
                Войти через Discord
              </button>
            </a>
          </p>
        `,
          focusConfirm: false,
          showConfirmButton: false,
        });
      },

      onBurgerClick() {
        this.burgerClicked = !this.burgerClicked;
      },

      logOut() {
        this.$store.dispatch("logOut");
      },

      onDocumentScroll() {
        if (window.scrollY > 0) {
          this.breadcrumbTextStyle = this.breadcrumbTextScrollDownStyle;
          this.breadcrumbStyle = this.breadcrumbScrollDownStyle;

          this.scrollingDown = true;
        } else {
          this.scrollingDown = false;
          this.breadcrumbTextStyle = {};
          this.breadcrumbStyle = this.breadcrumbScrollUpStyle;
        }
      },

      getRouteAssoc() {},
    },

    computed: {
      user() {
        // return window.localStorage.getItem("user");
        return this.$store.state.user;
      },
    },

    mounted() {
      this.margin = getComputedStyle(this.$refs.wrapper).height;
      this.$nextTick(() => {
        this.margin = this.$refs.wrapper.getBoundingClientRect().height + "px";
      });

      document.addEventListener("scroll", this.onDocumentScroll);

      this.$nextTick(() => {
        this.$nextTick(() => {
          this.margin =
            this.$refs.wrapper.getBoundingClientRect().height + "px";
        });
      });
    },

    // updated() {
    //   this.$nextTick(() => {
    //     this.$nextTick(() => {
    //       this.margin =
    //         this.$refs.wrapper.getBoundingClientRect().height + "px";
    //     });
    //   });
    //   // this.margin =
    //   // this.margin = getComputedStyle(this.$refs.wrapper).height;
    // },
  };
</script>

<style scoped>
  @keyframes show {
    from {
      transfrom: translateY(-20px);
    }

    to {
      transform: translateY(0px);
    }
  }

  .breadcrumb {
    /* padding: 21px 0; */
    align-items: center;
    display: flex;
    background-color: var(--c-body);
    /* border-bottom: 1px var(--c-border) solid; */
    transition: 0.2s;
    height: 50px;

    animation-name: "show";
    animation-duration: 0.2s;

    align-content: left;

    transform-origin: top;
  }

  .breadcrumb-inner-wrapper {
    width: 100%;
  }

  .breadcrumb span {
    font-weight: 700;
    font-family: "Montserrat";
    /* font-size: 30px; */
    transition: 0.1s;
    display: inline-block;
  }

  .breadcrumb a {
    transition: 0.2s;
  }

  .nav-bar-wrapper {
    z-index: 999;
    position: fixed;
    width: 100%;
    top: 0;
  }

  .logo {
    width: 120px;
    image-rendering: pixelated;
    /* border-b */
  }

  .logo-link {
    border: none;
    transition: 0.2s;
  }

  .logo-link:hover {
    transform: scale(1.1);
  }

  .burger {
    display: none;
  }

  nav {
    z-index: 1;
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    /* border-bottom: 1px var(--c-border) solid; */
    top: 0;
    background-color: var(--c-body);
    /* height: 80px; */
    transition: 0.2s;
  }

  .menu a {
    margin-right: 20px;
  }

  .nav-scroll-down {
    /* height: 50px; */
    padding-top: 5px;
    box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
    padding-bottom: 5px;
  }

  .nav-bar-inner-wrapper {
    flex-wrap: wrap;
    display: flex;
    gap: 20px;
    align-items: center;
    z-index: 1;
  }

  .log-out-button img {
    width: 30px;
    display: block;
  }

  .user-info {
    flex-grow: 1;
    text-align: right;
    vertical-align: middle;
  }

  .user-info > * {
    margin-left: 10px;
  }

  .avatar {
    border-radius: 1000px;
    vertical-align: middle;
    height: 35px;
    width: 35px;
    margin: 0;
  }

  .arrow-right {
    border-top: 3px solid gray;
    border-right: 3px solid gray;
    height: 15px;
    width: 15px;
    display: inline-block;
    transform: rotate(45deg);
    margin-right: 15px;
    margin-left: 10px;
  }

  .breadcrumb-scroll-down span {
    font-size: 16px;
  }

  .breadcrumb-scroll-down {
    padding: 0;
    height: 50px;
    transform: scaleY(0);
  }

  .breadcrumb-scroll-down .arrow-right {
    height: 10px;
    width: 10px;
  }

  .login-button {
    border: none;
    /* margin-left: 30px; */
  }

  a {
    font-weight: 600;
    /* border: none; */
    font-family: "Montserrat";
  }

  /* a:hover {
    border: none;
  } */

  .log-out-button {
    padding: 0;
    background: none;
    vertical-align: middle;
    margin-left: 20px;
  }

  .arrow-right {
    height: 10px;
    width: 10px;
  }

  @media screen and (max-width: 850px) {
    .logo {
      display: none;
    }
    /* .nav-bar-inner-wrapper > .menu {
      display: none !important;
    } */

    .menu {
      transform: scaleY(0);
      /* margin: 0px; */
      /* padding: 0px; */
      display: none;
      transition: 0.2s;
    }

    .menu a {
      display: block;
      width: 100vw;
      margin-bottom: 10px;
      border-bottom: none;
    }

    .burger {
      display: block;
      background: none;
      /* height: 30px; */
      height: auto;
      padding: 0;
    }

    .burger img {
      display: block;
    }

    .user-info a {
      display: none;
    }

    .breadcrumb-scroll-down {
      transform: scaleY(0);
    }

    .user-info {
      order: 1;
    }

    .menu {
      order: 2;
    }

    /* .breadcrumb span {
      font-size: 16px;
      vertical-align: middle;
    } */

    h1 {
      /* margin-top: 20px; */
    }

    .breadcrumb {
      /* height: 40px; */
      /* display: flex; */
      /* transform: scaleY(0); */
    }

    .burger-clicked-menu {
      display: block;
      transform: scaleY(1);
      /* height: auto; */
    }
  }
</style>
