<template>
  <div>
    <div class="readable-container wrapper text-block readable-container">
      <h3 style="margin-top: 0">Добавь публикацию</h3>
      <p>
        Чтобы добавить статью, сперва надо ее написать тут
        <a href="https://telegra.ph">Telegraph</a>, а потом добавить ссылку
        сюда:
      </p>

      <p class="input-section">
        <input
          v-model="contentUrl"
          type="text"
          placeholder="Ссылка на сатью из telegra.ph"
        />
        <button @click="addPublication">Добавить</button>
      </p>
      <h3>Прикрепить теги</h3>
      <p>
        <button
          @click="onTagClick(tag)"
          class="tag"
          :class="activeTags.has(tag) ? 'active-tag' : ''"
          v-for="tag in tags"
          :key="tag"
        >
          {{ tag }}
        </button>
      </p>

      <h3>Добавить новый тег (нет)</h3>
      <p>Внимание! Это создаст новую категорию — добавлять, если необходимо</p>
      <p class="input-section">
        <input type="text" placeholder="Название нового тега" />
        <button>Добавить</button>
      </p>
    </div>
  </div>
</template>

script.
<script>
  import * as api from "../api.js";
  export default {
    components: {},

    data() {
      return {
        tags: [],
        activeTags: new Set(),
        contentUrl: "",
        type: "tutorial",
      };
    },

    mounted() {
      api.getTutorialsTags().then((result) => {
        let array = result.data;
        this.tags = array.map((elem) => elem.data.name);
      });
    },

    methods: {
      async addPublication() {
        this.$swal.showLoading();
        if (this.contentUrl && window.localStorage.getItem("auth")) {
          if (!this.contentUrl.startsWith("https://telegra.ph/")) {
            this.$swal("Вы ввели какое-то говно вместо ссылки");
            return;
          }
          let res = await fetch(
            this.contentUrl.replace("telegra.ph", "api.telegra.ph/getPage") +
              "?return_content=true"
          );

          let json = await res.json();
          console.log(json);

          if (json.ok) {
            let title = json.result.title;
            let description = json.result.description;

            //find image if it exists
            let imageUrl = null;
            json.result.content.forEach((elem) => {
              if (
                elem.tag == "figure" &&
                elem.children[0].tag == "img" &&
                !imageUrl
              ) {
                imageUrl = "https://telegra.ph" + elem.children[0].attrs.src;
                return;
              }
            });

            api
              .publicate({
                auth: window.localStorage.getItem("auth"),
                title,
                type: this.type,
                description,
                tags: Array.from(this.activeTags),
                contentUrl: this.contentUrl,
                imageUrl,
              })
              .then((res) => {
                if (res.error) {
                  this.$swal("Ошибка: " + res.error);
                } else {
                  this.$swal("Нормас");
                }
              });
          } else {
            this.$swal(
              "Публикация не найдена на сайте telegra.ph. Скопируйте адрес корректно"
            );
          }
        } else {
          // alert("ты что-то делаешь не так");
          this.$swal("ты что-то делаешь не так");
        }
      },

      onTagClick(tag) {
        if (this.activeTags.has(tag)) {
          this.activeTags.delete(tag);
        } else {
          this.activeTags.add(tag);
        }
      },
    },
  };
</script>

<style scoped>
  .input-section {
    display: flex;
    gap: 10px;
  }

  .tag {
    border: 1px grey solid;
    padding: 3px 10px;
    border-radius: 100px;
    margin-right: 5px;
    display: inline-block;
    margin-bottom: 5px;
    color: black;
    background-color: #fff;
    height: auto;
  }

  .active-tag {
    background: #000;
    color: white;
  }

  .wrapper {
    /* border: 1px #dfdfdf solid; */
    border-radius: 10px;
    padding: 50px;
    margin-top: 50px;
    margin-bottom: 50px;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2);
    /* padding: 20px; */
    border-radius: 10px;
  }

  @media screen and (max-width: 850px) {
    .wrapper {
      padding: 30px;
      border: none;
      margin-top: 20px;
    }

    .input-section {
      display: flex;
      gap: 10px;

      flex-direction: column;
    }
  }
</style>
