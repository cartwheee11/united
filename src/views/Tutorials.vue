<template>
  <div class="main-wrapper container">
    <div class="feed-wrapper">
      <Feed
        :route-base="'/tutorials'"
        v-if="tutorials.length"
        :publications="tutorials"
      />
      <div v-else-if="showError" class="error">
        <p>
          Недостаточно прав: чтобы просматривать руководства, нужно войти в
          систему и иметь ранг от «рекрута»
        </p>
      </div>
      <spiner v-else />
      <button
        class="download-more-button"
        v-if="tutorialsAfter && !buttonLoading"
        @click="getTutorials"
      >
        Загрузить еще
      </button>

      <div
        v-if="tutorialsAfter && buttonLoading"
        class="download-more-spinner-wrapper"
      >
        <spiner />
      </div>
    </div>

    <div class="controls-wrapper text-block">
      <h3>Фильтр (в разработке)</h3>
      <p>
        <input type="text" placeholder="Поиск" style="width: 100%" />
      </p>
      <p class="tags">
        <span v-for="tag in tags" :key="tag"
          ><button
            @click="onTagClick(tag)"
            class="tag"
            :class="activeTags.has(tag) ? 'active-tag' : ''"
          >
            {{ tag }}
          </button></span
        >
      </p>
      <!-- <p></p> -->
      <p v-if="$store.state.user">
        <router-link to="/create">Добавить руководство</router-link>
      </p>
    </div>
  </div>
</template>

<script>
  import Spiner from "../components/Spiner.vue";
  import Feed from "../components/Feed.vue";
  import * as api from "../api.js";
  export default {
    components: {
      Feed,
      Spiner,
    },

    data() {
      return {
        tutorials: [],
        tutorialsAfter: null,
        buttonLoading: false,
        tags: new Set(),
        activeTags: new Set(),
        showError: false,
      };
    },

    computed: {
      user() {
        return this.$store.state.user;
      },
    },

    mounted() {
      this.getTutorials();
      api.getTutorialsTags().then((result) => {
        let array = result.data;
        this.tags = array.map((elem) => elem.data.name);
      });
    },

    methods: {
      onTagClick(tag) {
        if (this.activeTags.has(tag)) {
          this.activeTags.delete(tag);
        } else {
          this.activeTags.add(tag);
        }
      },

      getTutorials() {
        this.buttonLoading = true;
        api
          .getTutorials({
            size: 5,
            after: this.tutorialsAfter ? this.tutorialsAfter : undefined,
            userId: this.$store.state.user?.id,
          })
          .then((res) => {
            // console.log(res);
            if (res) {
              if (res.after) {
                this.tutorialsAfter = res.after[0]["@ref"].id;
              } else {
                this.tutorialsAfter = null;
              }
              this.buttonLoading = false;
              this.tutorials = this.tutorials.concat(
                res.data.map((elem) => elem.data)
              );
            } else {
              this.showError = true;
            }
          });
      },
    },
  };
</script>

<style scoped>
  .main-wrapper {
    display: flex;
    gap: 30px;
    margin-top: 50px;
    margin-bottom: 50px;
    min-height: 100%;
    width: 100%;
    flex-grow: 1;
  }

  .feed-wrapper {
    width: 66%;
    /* height: 100%; */
    /* text-align: center; */
  }

  .add-tutorial-button {
    width: 100%;
    border: 1px solid #d4d4d4;
    background: none;
  }

  .download-more-button {
    /* text-align: center; */
    display: block;

    margin: 0 auto;
    margin-top: 50px;
  }

  .controls-wrapper {
    width: 33.3%;
  }

  .controls-wrapper h3 {
    margin-top: 0;
  }

  .tag {
    white-space: nowrap;
    height: auto;
    color: black;
    border: 1px grey solid;
    padding: 3px 10px;
    border-radius: 100px;
    margin-right: 5px;
    /* display: inline-block; */
    margin-bottom: 5px;
    /* word-break: keep-all; */
    background-color: #fff;
  }

  .active-tag {
    background: #000;
    color: white;
  }

  .error {
    height: 100%;
    vertical-align: middle;
    display: flex;
    align-items: center;
    align-content: center;
    margin: 0 auto;
    width: 50%;
  }

  .error p {
    text-align: center;
    width: 100%;
    display: block;
    margin-top: 0;
  }

  .download-more-spinner-wrapper {
    margin-top: 50px;
    padding-bottom: 5px;
  }

  @media screen and (max-width: 850px) {
    .main-wrapper {
      flex-wrap: wrap;
    }

    .feed-wrapper {
      width: 100%;
      order: 2;
    }

    .tags {
      width: 100%;
      overflow-x: scroll;
      display: flex;
    }

    .tags::-webkit-scrollbar {
      display: none;
    }

    .tags span {
      display: inline-block;
    }

    .controls-wrapper {
      order: 1;
      width: 100%;
      border-bottom: solid #dfdfdf 1px;
      /* margin-bottom: 20px; */
      padding-bottom: 20px;
    }
  }
</style>
