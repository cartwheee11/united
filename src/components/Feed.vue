<template>
  <div>
    <div class="feed-grid">
      <router-link
        :to="routeBase + '/' + item.id"
        @click="$emit('item-click', i)"
        v-for="(item, i) in publications"
        :key="item"
        class="feed-item"
        :class="!item.imageUrl ? 'feed-item-with-no-image' : ''"
      >
        <div class="feed-item-inner-wrapper">
          <img :src="item.imageUrl" alt="" />
          <h3>{{ item.title }}</h3>
          <p v-if="item.accessFrom">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="-3px"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              style="fill: var(--c-accent); vertical-align: middle"
            >
              <path
                d="M 12 1 C 8.6761905 1 6 3.6761905 6 7 L 6 8 L 4 8 L 4 22 L 20 22 L 20 8 L 18 8 L 18 7 C 18 3.6761905 15.32381 1 12 1 z M 12 3 C 14.27619 3 16 4.7238095 16 7 L 16 8 L 8 8 L 8 7 C 8 4.7238095 9.7238095 3 12 3 z M 12 13 C 13.1 13 14 13.9 14 15 C 14 16.1 13.1 17 12 17 C 10.9 17 10 16.1 10 15 C 10 13.9 10.9 13 12 13 z"
              ></path>
            </svg>
            | Доступно с ранга: <strong>{{ item.accessFrom }}</strong>
          </p>
          <p class="description">
            {{ item.description.slice(0, 150) + "..." }}
          </p>
          <p>
            <img
              class="avatar"
              style="width: 30px; vertical-align: middle; margin-right: 10px"
              :src="item.avatar"
              alt=""
            />
            <strong>{{ item.name?.slice(0, item.name.indexOf("|")) }}</strong>
          </p>

          <!-- <p><a href="#">item.author.avatar</a> {{ item.author.name }}</p> -->
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      publications: {
        type: Array,
        rquired: false,
        default: new Array(),
      },

      routeBase: {
        type: String,
        reqiured: false,
      },

      bigFirstOne: {
        type: Boolean,
        required: false,
        default: true,
      },
    },
  };
</script>

<style scoped>
  .description {
    max-width: 600px;
  }

  .feed-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    row-gap: 50px;
    grid-column-start: span;
  }

  .feed-item {
    /* margin-bottom: 50px; */
  }

  .feed-item:first-child {
    grid-column-start: span 2;
  }

  .feed-item:first-child h3 {
    font-size: 35px;
  }

  .feed-item-with-no-image .feed-item-inner-wrapper {
    border: 1px solid #dfdfdf;
    border-radius: 10px;
    vertical-align: center;
    /* padding: 20px 20px 5px 20px; */
    padding: 20px;
    padding-top: 5px;
    /* padding-bottom: 20px */
  }

  .feed-item-with-no-image h3 {
    margin-top: 0 !important;
    padding: 0;
  }

  .feed-item img {
    border-radius: 10px;
    width: 100%;
  }

  .feed-item h3 {
    margin-top: 25px;
  }

  .feed-grid {
  }

  .avatar {
    border-radius: 1000px !important;
  }

  a {
    border-bottom: none;
    transition: 0.2s;
  }

  a:hover {
    transform: translateY(-10px);
    z-index: 0;
  }

  @media screen and (max-width: 800px) {
    .feed-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
