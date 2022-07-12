const { Let, Map, Match, Index, Get, Var, Lambda } = require("faunadb");
// const fauna = require('faunadb');
const db = require("./getDb.js");
// const q = fauna.query;

const tags = ["навыки", "заработок"];

const result = db.query(
  Let(
    {
      result: Map(
        tags,
        Lambda("tag", Match(Index("tutorials-by-tag"), Var("tag")))
      ),
    },
    Get(Var("result"))
  )
);

result.then(console.log);
