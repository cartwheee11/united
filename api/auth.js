const fetch = require("node-fetch");
const config = require("./config.json");
const fauna = require("faunadb");
const db = require("./getDb.js");
const Jimp = require("jimp");
const bcrypt = require("bcrypt");

const q = fauna.query;

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  let auth = req.body;
  let result = await fetch("https://discord.com/api/users/@me", {
    headers: {
      authorization: auth,
    },
  });
  let user = await result.json();

  result = await fetch("https://discord.com/api/users/@me/guilds", {
    headers: {
      authorization: auth,
    },
  });

  let guilds = await result.json();

  if (guilds.map((elem) => elem.id == config.guildId)) {
    if (guilds instanceof Array) {
      result = await fetch(
        `https://discord.com/api/users/@me/guilds/${config.guildId}/member`,
        {
          headers: {
            authorization: auth,
          },
        }
      );

      let guildProfile = await result.json();
      let img = await Jimp.read(
        `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`
      );

      let base64 = await img.getBase64Async("image/png");
      user.avatar = base64;
      user.guilds = guilds;
      user.guildProfile = guildProfile;

      user.auth = bcrypt.hashSync(auth, 10);

      await db.query(
        q.Let(
          {
            match: q.Match(q.Index("user-by-id"), user.id),
            data: {
              data: {
                id: user.id,
                profile: user,
                guildProfile,
                guilds,
              },
            },
          },
          q.If(
            q.Exists(q.Var("match")),
            q.Update(q.Select("ref", q.Get(q.Var("match"))), q.Var("data")),
            q.Create(q.Collection("users"), q.Var("data"))
          )
        )
      );

      res.json(user);
    } else {
      res.json(false);
    }
  } else {
    res.json(false);
  }
}
