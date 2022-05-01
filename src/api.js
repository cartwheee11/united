const config = require("./config.json");
require("dotenv").config();

//галлерея
class Gallery {
  constructor() {
    this.url = process.env.VUE_APP_API_URL + "/gallery/getImages";
  }

  async getImages(size, after) {
    let ans = await fetch(this.url, {
      body: JSON.stringify({ size, after }),
      method: "post",
    });

    return await ans.json();
  }
}

let gallery = new Gallery();

export { gallery };

//аутентификация
export async function auth(auth) {
  let result = await fetch(process.env.VUE_APP_API_URL + "/auth", {
    method: "post",
    body: auth,
  });

  let response = await result.json();

  return response;
}

//взять профиль сервера discord
export async function getGuildUser() {
  let user = window.localStorage.getItem("user");
  let guildId = config.guildId;
  let auth = window.localStorage.getItem("auth");

  if (user) {
    user = JSON.parse(user);

    let result = await fetch(
      `https://discord.com/api/users/@me/guilds/${guildId}/member`,
      {
        method: "GET",
        headers: {
          authorization: auth,
        },
      }
    );
    let body = await result.json();

    return body;
  } else {
    return false;
  }
}

//взять теги руководств
export async function getTutorialsTags() {
  let result = await fetch(
    process.env.VUE_APP_API_URL + "/publications/tutorials/tags"
  );
  let body = result.json();

  return body;
}

export async function publicate({
  auth,
  contentUrl,
  description,
  tags,
  type,
  title,
  imageUrl,
}) {
  let result = await fetch(process.env.VUE_APP_API_URL + "/publications/add", {
    method: "POST",
    body: JSON.stringify({
      auth,
      contentUrl,
      description,
      tags,
      type,
      title,
      imageUrl,
    }),
  });
  let body = result.json();

  return body;
}

export async function getTutorials(params = {}) {
  const after = params.after;
  const size = params.size;
  const userId = params.userId;

  let result = await fetch(
    process.env.VUE_APP_API_URL + "/publications/tutorials/get",
    {
      method: "POST",
      body: JSON.stringify({ after, size, userId }),
    }
  );
  let json = await result.json();

  return json;
}

export async function getTelegraphContent(url) {
  let res = await fetch(
    url.replace("telegra.ph", "api.telegra.ph/getPage") + "?return_content=true"
  );

  let json = res.json();

  return json;
}

export async function getTutorialById(id) {
  let response = await fetch(
    process.env.VUE_APP_API_URL + "/publications/tutorials/getById",
    {
      method: "post",
      body: JSON.stringify({ id: id }),
    }
  );

  return await response.json();
}

export async function getTutorialByUrl(url) {
  let response = await fetch(
    process.env.VUE_APP_API_URL + "/publications/tutorials/getByUrl",
    {
      method: "post",
      body: JSON.stringify({ url }),
    }
  );

  return await response.json();
}

export async function getUserByIdFromDb(id) {
  let res = await fetch(process.env.VUE_APP_API_URL + "/users/getByIdFromDb", {
    method: "post",
    body: id,
  });

  const json = await res.json();

  return json;
}

export async function getUsersFromDb(size, after) {
  let res = await fetch(process.env.VUE_APP_API_URL + "/users/getFromDb", {
    method: "post",
    body: JSON.stringify({ size, after }),
  });

  return await res.json();
}
