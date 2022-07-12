<template>
  <div>
    <div class="container title-section">
      <div class="readable-container">
        <h1>
          Вступай в наши ряды!
          <span style="color: var(--c-accent)">Заполни заявку:</span>
        </h1>
      </div>
    </div>

    <div class="container submit-section">
      <div class="readable-container info-block">
        <h3>Давай разберёмся</h3>
        <p>
          Важно понимать, что мы не принимаем в команду всех, а только хороших
          людей. Если в тебе есть уверенность, что ты хороший, то смело заполняй
          заявку :)
        </p>

        <p>
          Так же набор осуществляется с 14 лет, хотя могут быть и свои
          исключения
        </p>
        <br />
        <hr />
        <h3>Немного о тебе, зай</h3>
        <p><input type="text" placeholder="Твой ник на сервере RC" /></p>
        <p style="display: flex; gap: 10px; margin-top: 10px">
          <input type="text" placeholder="Никнейм в дискорде#4156" />
          <input type="text" placeholder="Твой возраст" />
        </p>
        <br />
        <hr />
        <h3>Парочка слов</h3>
        <textarea
          style="margin-top: 10px"
          name=""
          id=""
          cols="30"
          rows="10"
          placeholder="о том, чем обчно занимаешься на сервере и чего ожидаешь от гильдии"
        ></textarea>
        <br />
        <br />
        <hr />
        <p><button>Отправить</button></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .title-section {
    text-align: center;
  }

  .info-block {
    margin-top: 50px;
  }

  .submit-section h3:first-child {
    margin-top: 0;
  }
</style>
