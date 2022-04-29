const db = require("../getDb.js");
const fauna = require("faunadb");
const fetch = require("node-fetch");
const getGuildUser = require("../service/getGuildUser.js");
const config = require("../config.json");

const q = fauna.query;

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let body = JSON.parse(req.body);

  console.log(body);

  if (!body.auth) {
    res.json({ error: "bad auth" });
    return;
  }

  let user = await getGuildUser(body.auth);

  console.log(user);
  if (user.guildProfile?.roles.indexOf(config.roles["Советник"]) >= 0) {
    delete body.auth;
    if (!(body.contentUrl && body.title && body.type)) {
      res.json({ error: "вы постите какую-то дичь" });
      return;
    }

    if (body.type == "tutorial") {
      body.author = user.id;
      db.query(q.Create("tutorials", { data: body }));
      res.json({ message: "success" });
    }
  } else {
    res.json({ error: "Недостаточно прав для публикации или ошибка сервера" });
    return;
  }
}
