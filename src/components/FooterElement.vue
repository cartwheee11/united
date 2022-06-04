<template>
  <div class="footer">
    <div class="container">
      <router-link to="/">
        <!-- <img src="../assets/united-logo.png" alt="" /> -->
        <h2
          style="
                margin: 0;
                display: block !important;
                <!-- font-family: 'montserrat'; -->
                font-weight: 800;
                transform: translateY(4px)
              "
        >
          UNI
        </h2>
      </router-link>
    </div>
  </div>
</template>

<style scoped>
  .footer {
    border-top: 1px solid var(--c-border);
  }

  router-link {
    text-decoration: none !important;
  }

  .container {
    padding-top: 50px;
    padding-bottom: 50px;
  }
</style>
