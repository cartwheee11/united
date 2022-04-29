<template>
  <div class="footer">
    <div class="container">
      <router-link to="/"
        ><img src="../assets/united-logo.png" alt=""
      /></router-link>
    </div>
  </div>
</template>

<style scoped>
  .footer {
    border-top: 1px solid #dfdfdf;
  }

  router-link {
    text-decoration: none !important;
  }

  .container {
    padding-top: 50px;
    padding-bottom: 50px;
  }
</style>
