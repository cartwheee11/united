<template>
  <div>
    <div style="display: block" ref="wrapper" class="nav-bar-wrapper">
      <nav :class="scrollingDown ? 'nav-scroll-down' : ''" ref="nav">
        <div class="container nav-bar-inner-wrapper">
          <router-link to="/"
            ><img class="logo" src="../assets/united-logo.png" alt=""
          /></router-link>
          <router-link to="/news">новости</router-link>
          <router-link to="/tutorials">руководства</router-link>
          <router-link to="/about">о нас</router-link>
          <!-- <router-link to="/about">список игроков</router-link> -->
          <!-- <router-link to="/tutorials">руководства</router-link> -->
          <div v-if="user" class="user-info">
            <!-- {{ JSON.parse(window.localStorage.getItem("user")) }} -->
            <img
              class="avatar"
              :src="`https://cdn.discordapp.com/avatars/${$store.state.user.id}/${$store.state.user.avatar}`"
              alt=""
            />
            <a href="#">{{ $store.state.user.guildProfile.nick }}</a>
            <button class="log-out-button" @click="logOut">
              <img
                src="https://img.icons8.com/fluency-systems-filled/48/000000/exit.png"
              />
            </button>
          </div>
          <a
            v-else
            href="https://discord.com/api/oauth2/authorize?client_id=959075645118378085&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fauth&response_type=token&scope=identify%20guilds%20guilds.members.read"
            class="login-button user-info"
            ><button>войти</button></a
          >
          <!-- <button v-else @click="">войти</button> -->
        </div>
      </nav>
      <div
        :style="breadcrumbStyle"
        ref="breadcrumb"
        v-if="$route.name != 'Home'"
        class="breadcrumb"
      >
        <div class="container breadcrumb-inner-wrapper">
          <span
            ><router-link
              :style="breadcrumbTextStyle"
              to="/"
              style="opacity: 0.4"
              >Главная</router-link
            ><span class="arrow-right"></span
          ></span>
          <span :style="breadcrumbTextStyle"> {{ $route.name }}</span>
        </div>
      </div>
    </div>
    <div class="margin-element" :style="`height: ${margin}`"></div>
  </div>
</template>

<script>
  export default {
    props: {
      // user: {
      //   required: true,
      //   type: [Object, null],
      // },
    },

    data() {
      return {
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

        scrollingDown: false,
      };
    },

    methods: {
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
    padding: 21px 0;
    background-color: white;
    border-bottom: 1px var(--border-color) solid;
    transition: 0.2s;
    height: 80px;

    animation-name: "show";
    animation-duration: 0.2s;
  }
  .breadcrumb span {
    font-weight: 700;
    font-family: "Montserrat";
    font-size: 30px;
    transition: 0.2s;
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
  }

  nav {
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px var(--border-color) solid;
    top: 0;
    background-color: white;
    /* height: 80px; */
    transition: 0.2s;
  }

  .nav-scroll-down {
    /* height: 50px; */
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .nav-scroll-down a {
  }

  .nav-bar-inner-wrapper {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .log-out-button {
    padding: 0;
    background: none;
    vertical-align: middle;
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
    margin-left: 20px;
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

  .login-button {
    border: none;
  }

  a {
    font-weight: 600;
    border: none;
  }

  a:hover {
    border: none;
  }
</style>
