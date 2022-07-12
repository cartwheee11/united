<template>
  <div class="main-wrapper container">
    <div class="feed-wrapper">
      <Feed
        :first-item-grow="false"
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
        @click="loadTutorials"
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
      <div class="controls">
        <h3>Поиск</h3>
        <br />
        <p style="margin-top: 0">
          <input
            v-model="search"
            class="search"
            type="text"
            placeholder="Поиск"
            style="width: 100%"
          />
        </p>
        <p v-if="tags.length" class="tags">
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
        <!-- <p v-else><Spiner /><br /></p> -->

        <!-- <p></p> -->
        <p v-if="$store.state.user">
          <router-link to="/create">Добавить руководство</router-link>
        </p>
      </div>
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
        search: "asd",
        showError: false,
      };
    },

    computed: {
      user() {
        return this.$store.state.user;
      },
    },

    mounted() {
      this.loadTutorials();
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

        this.tutorialsAfter = null;
        this.tutorials = [];
        this.loadTutorials();
      },

      loadTutorials() {
        this.buttonLoading = true;
        api
          .getTutorials({
            size: 5,
            after: this.tutorialsAfter ? this.tutorialsAfter : undefined,
            userId: this.$store.state.user?.id,
            search: this.search,
            tags: Array.from(this.activeTags),
          })
          .then((res) => {
            if (res) {
              if (res.after) {
                this.tutorialsAfter = res.after[0]["@ref"].id;
              } else {
                this.tutorialsAfter = null;
              }
              this.buttonLoading = false;
              this.tutorials = this.tutorials.concat(
                res.data.map((elem) => {
                  elem.data.id = elem.ref["@ref"].id;
                  return elem.data;
                })
              );

              this.tutorials.forEach(async (elem) => {
                let user = await api.getUserByIdFromDb(elem.author);
                user = user.data[0].data;
                elem.name = user.guildProfile.nick;
                elem.avatar = user.profile.avatar;
              });
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
    padding: 0 100px;
    display: flex;
    gap: 20px;
    margin-top: 50px;
    margin-bottom: 50px;
    min-height: 100%;
    width: 100%;
    flex-grow: 1;
    flex-wrap: wrap;
  }

  .feed-wrapper {
    width: 100%;
    order: 2;
    /* height: 100%; */
    /* text-align: center; */
  }

  .add-tutorial-button {
    width: 100%;
    border: 1px solid #dfdfdf;
    background: none;
  }

  .download-more-button {
    /* text-align: center; */
    display: block;

    margin: 0 auto;
    margin-top: 50px;
  }

  .controls-wrapper {
    order: 1;
    width: 100%;
    /* margin-bottom: 20px; */
    margin: 30px 0;
    padding-bottom: 20px;
    /* width: 40%; */
  }

  .controls {
    /* border-top: 5px solid var(--c-accent); */
    /* border: 1px solid var(--c-border); */
    /* padding: 20px; */
    border-radius: 10px;
    /* background: #f5f6f9; */
    text-align: center;
  }

  .controls-wrapper h3 {
    margin-top: 0;
  }

  .search {
    max-width: 800px;
  }

  .tags {
    text-align: center;
  }

  .tag {
    white-space: nowrap;
    height: auto;
    color: black;
    /* border: 1px var(--c-border) solid; */
    padding: 3px 10px;
    border-radius: 100px;
    margin-right: 5px;
    /* display: inline-block; */

    margin-bottom: 5px;
    /* word-break: keep-all; */
    background-color: var(--c-block);
    text-align: center;
  }

  .active-tag {
    background: var(--c-accent);
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
      padding: 0 20px;
      flex-wrap: wrap;
      margin-top: 20px;
    }

    button,
    input[type="text"] {
      height: 50px;
    }

    .feed-wrapper {
      width: 100%;
      order: 2;
      margin-top: 0;
    }

    .controls-wrapper {
      padding-bottom: 0 !important;
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
      padding-bottom: 20px;
    }
  }
</style>
