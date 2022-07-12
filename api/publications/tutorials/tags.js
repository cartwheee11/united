const fauna = require("faunadb");
const db = require("../../../api-service/getDb");

let q = fauna.query;

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  let result = await db.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("tutorials-tags"))),
      q.Lambda((x) => q.Get(x))
    )
  );

  res.json(result);
}
