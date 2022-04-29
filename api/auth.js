const fetch = require("node-fetch");
const config = require("./config.json");
const fauna = require("faunadb");
let db = require("./getDb.js");

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

  result = await fetch(
    `https://discord.com/api/users/@me/guilds/${config.guildId}/member`,
    {
      headers: {
        authorization: auth,
      },
    }
  );

  let guildProfile = await result.json();
  user.guilds = guilds;
  user.guildProfile = guildProfile;

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
      res.json(user);
    } else {
      res.json(false);
    }
  } else {
    res.json(false);
  }
}
