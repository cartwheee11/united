<!-- eslint-disable vue/no-deprecated-html-element-is -->
<template>
  <div style="display: flex; flex-direction: column; flex-grow: 1">
    <div v-if="rawContent">
      <div class="container">
        <div class="readable-container">
          <h1>{{ rawContent.title }}</h1>
          <div ref="content" class="content text-block"></div>
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
      };
    },

    components: {
      Spiner,
    },

    mounted() {
      console.log("https://telegra.ph/" + this.$route.params.id);
      api
        .getTutorialByUrl("https://telegra.ph/" + this.$route.params.id)
        .then(async (res) => {
          let raw = await api.getTelegraphContent(res.contentUrl);
          this.rawContent = raw.result;
        });
    },

    watch: {
      rawContent() {
        this.$nextTick(() => {
          console.log(this.rawContent);
          const array = this.rawContent.content;
          const content = this.$refs.content;

          array.forEach((elem) => {
            console.log(elem);
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
            console.log(newElement);
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

  .readable-container {
    margin-left: 0;
  }
</style>

<style>
  figure img {
    border: 1px solid #dfdfdf;
    border-radius: 10px;
  }
</style>
