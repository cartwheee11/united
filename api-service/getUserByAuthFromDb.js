const db = require("./getDb");
const fauna = require("faunadb");
const q = fauna.query;

async function getUserByAuthFromDb(auth) {
  let res = await db.query(
    q.Map(
      q.Paginate(q.Match(q.Index("user-by-auth"), auth)),
      q.Lambda("elem", q.Get(q.Var("elem")))
    )
  );

  return res;
}

module.exports = getUserByAuthFromDb;
