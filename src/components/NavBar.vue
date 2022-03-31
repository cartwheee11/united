<template>
  <div>
    <div class="nav-bar-wrapper">
      <nav>
        <div class="container nav-bar-inner-wrapper">
          <img class="logo" src="../assets/united-logo-no-text.png" alt="" />
          <router-link to="/about">о нас</router-link>
          <router-link to="/about">список игроков</router-link>
          <router-link to="/about">рейтинги</router-link>
        </div>
      </nav>
    </div>
  </div>
</template>

<style scoped>
  nav {
    position: fixed;
  }

  .logo {
    width: 50px;
  }

  nav {
    width: 100%;
    padding-top: 20px;
    padding-bottom: 20px;
    border-bottom: 1px var(--border-color) solid;
    top: 0;
  }

  .nav-bar-inner-wrapper {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .nav-bar-wrapper {
    margin-bottom: 76px;
  }

  a {
    font-weight: 600;
  }
</style>
