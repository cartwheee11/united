<template>
  <div class="asjdhaskjfhaskjfh">
    <div class="inner">
      <!-- <img src="../assets/heart-loading.gif" alt="" /> -->
      <p class="flip">U</p>
    </div>
  </div>
</template>

<style scoped>
  @keyframes flipping {
    from {
      transfrom: scaleX(1);
    }

    50% {
      transform: scaleX(0);
    }

    to {
      transfrom: scaleX(1);
    }
  }

  .asjdhaskjfhaskjfh {
    /* width: 100%; */
    height: 100%;
    display: flex;
    text-align: center;
    flex-grow: 1;

    align-content: center;
    align-items: center;
  }

  img {
    width: 35px;
    height: 35px;
    /* background-color: red; */
    align-self: center;
    mix-blend-mode: multiply;
  }

  .flip {
    font-family: "Montserrat";
    font-size: 30px;
    font-weight: 800;
    animation-name: flipping;
    animation-duration: 1s;
    animation-iteration-count: infinite;
  }

  .inner {
    width: 100%;
  }
</style>
