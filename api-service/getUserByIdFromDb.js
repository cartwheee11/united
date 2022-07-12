const db = require("./getDb");
const fauna = require("faunadb");
const q = fauna.query;

async function getUserByIdFromDb(id) {
  let res = await db.query(
    q.Map(
      q.Paginate(q.Match(q.Index("user-by-id"), id)),
      q.Lambda("elem", q.Get(q.Var("elem")))
    )
  );

  return res;
}

module.exports = getUserByIdFromDb;
