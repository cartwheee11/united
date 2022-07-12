const fauna = require("faunadb");
const db = require("./getDb.js");
const q = fauna.query;
const config = require("../config.json");
const fetch = require("node-fetch");
const bcrypt = require("bcrypt");
const Jimp = require("jimp");

// let db = new fauna.Client({
//   secret: process.env.DB_SECRET,
//   domain: "db.fauna.com",
//   scheme: "https",
//   port: 443,
// });

// module.exports = db;

async function getGuildUser(auth) {
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

  let img = await Jimp.read(
    `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}`
  );

  let base64 = await img.getBase64Async("image/png");
  user.avatar = base64;

  result = await fetch(
    `https://discord.com/api/users/@me/guilds/${config.guildId}/member`,
    {
      headers: {
        authorization: auth,
      },
    }
  );

  let guildProfile = await result.json();
  user.guildProfile = guildProfile;
  user.guilds = guilds;
  user.auth = bcrypt.hashSync(auth, 10);
  if (guilds instanceof Array) {
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

    if (guilds.map((elem) => elem.id == config.guildId)) {
      return user;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

module.exports = getGuildUser;
