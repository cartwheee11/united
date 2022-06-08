<!-- eslint-disable vue/no-deprecated-html-element-is -->
<template>
  <div style="display: flex; flex-direction: column; flex-grow: 1">
    <div v-if="rawContent || errorMessage">
      <div class="container">
        <div v-if="rawContent" class="readable-container">
          <div class="title-section">
            <!-- <p>{{ date }}</p> -->
            <br />
            <h1>{{ rawContent.title }}</h1>
            <br />
            <p>
              <img
                width="30"
                style="
                  border-radius: 100%;
                  vertical-align: middle;
                  margin-right: 10px;
                "
                :src="avatar"
                alt=""
              />{{ author }}
            </p>
          </div>
          <div ref="content" class="content text-block"></div>
        </div>
        <div v-if="errorMessage" class="readable-container">
          <p>{{ errorMessage }}</p>
        </div>
      </div>
    </div>
    <Spiner v-else style="flex-grow: 1" />
  </div>
</template>

<script>
  import Spiner from "../components/Spiner.vue";
  import * as api from "../api.js";
  export default {
    data() {
      return {
        rawContent: null,
        errorMessage: null,
        author: null,
        date: null,
        accessFrom: null,
        avatar: null,
      };
    },

    components: {
      Spiner,
    },

    mounted() {
      api
        .getTutorialById(
          this.$route.params.id,
          this.$store.state?.user?.id,
          window.localStorage.getItem("auth")
        )
        .then(async (res) => {
          if (res.error) {
            if (res.error == "low rank") {
              this.errorMessage =
                "Ваш ранг слишком мал, чтобы просматривать эту статью";
            } else if (res.error == "bad auth") {
              this.errorMessage =
                "Данная статья доступна с определенного ранга: войдите в систему, чтобы мы могли его проверить";
            }
          } else {
            // this.author = res.data.name

            // elem.name = user.guildProfile.nick;
            let date = new Date((res.ts + 0) / 1000);
            this.date =
              date.getDay() + "." + date.getMonth() + "." + date.getFullYear();
            res = res.data;
            let user = await api.getUserByIdFromDb(res.author);
            this.author = user.data[0].data.guildProfile.nick;
            this.avatar = user.data[0].data.profile.avatar;

            let raw = await api.getTelegraphContent(res.contentUrl);
            this.rawContent = raw.result;
          }
        });
    },

    watch: {
      rawContent() {
        this.$nextTick(() => {
          const array = this.rawContent.content;
          const content = this.$refs.content;

          array.forEach((elem) => {
            let html = this.parseTag(elem);

            content.append(html);
          });
        });
      },
    },

    methods: {
      parseTag(elem) {
        if (elem.tag) {
          let newElement = document.createElement(
            elem.tag.replace("h3", "h2").replace("h4", "h3")
          );

          if (elem.attrs) {
            for (let attr in elem.attrs) {
              if (attr == "src") {
                newElement.setAttribute(
                  attr,
                  "https://telegra.ph" + elem.attrs[attr]
                );
              } else {
                newElement.setAttribute(attr, elem.attrs[attr]);
              }
            }
          }

          if (elem.children) {
            elem.children.forEach((children) => {
              newElement.append(this.parseTag(children));
            });
          }

          return newElement;
        } else if (typeof elem == "string") {
          return elem;
        }
      },
    },
  };
</script>

<style scoped>
  * {
    word-wrap: break-word;
  }

  .container {
    margin-top: 50px;
    padding-bottom: 100px;
  }
  h1 {
    margin: 0;
  }

  .readable-container {
    margin-left: 0;
  }

  .title-section {
    margin-top: 100px;
    margin-bottom: 40px;
  }

  @media screen and (max-width: 850px) {
    .title-section {
      margin-bottom: 10px;
      margin-top: 30px;
    }
  }
</style>

<style>
  figure img {
    border: 1px solid #dfdfdf;
    border-radius: 10px;
  }
</style>
