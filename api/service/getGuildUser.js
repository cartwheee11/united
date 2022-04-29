const fauna = require("faunadb");
const db = require("../getDb.js");
const q = fauna.query;
const config = require("../config.json");
const fetch = require("node-fetch");

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
