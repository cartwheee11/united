<template>
  <div>
    <div class="wrapper">
      <img v-if="img" :src="img" alt="" />
      <h2 class="title">{{ title }}</h2>
      <p v-if="description">{{ description }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "publication",
    props: {
      title: {
        type: String,
        required: true,
        default: "default header",
      },
      author: {
        type: String,
        required: true,
        default: "default author",
      },
      avatar: {
        type: String,
        required: true,
        default:
          "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=retro&f=y",
      },
      img: {
        type: String,
        require: false,
      },
      description: {
        type: String,
        required: false,
      },
    },
  };
</script>

<style scoped>
  .wrapper {
    width: 100%;
  }
</style>
