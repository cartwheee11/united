<template>
  <div>
    <div class="feed-grid">
      <router-link
        :to="routeBase + item.contentUrl.replace('https://telegra.ph', '')"
        @click="$emit('item-click', i)"
        v-for="(item, i) in publications"
        :key="item"
        class="feed-item"
        :class="!item.imageUrl ? 'feed-item-with-no-image' : ''"
      >
        <div class="feed-item-inner-wrapper">
          <img :src="item.imageUrl" alt="" />
          <h3>{{ item.title }}</h3>
          <p>{{ item.description.slice(0, 150) + "..." }}</p>
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
    },
  };
</script>

<style scoped>
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
    margin-top: 15px;
  }

  .feed-grid {
  }

  a {
    border-bottom: none;
    transition: 0.2s;
  }

  a:hover {
    transform: translateY(-10px);
    z-index: 0;
  }
</style>
