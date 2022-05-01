const fauna = require("faunadb");
const db = require("../getDb");

let q = fauna.query;

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  req.body = JSON.stringify(req.body);
  const size = req.body.size;
  const after = req.body.after;

  let response = await db.query(
    q.Map(
      q.Paginate(q.Documents(q.Collection("gallery")), { size, after }),
      q.Lambda("elem", q.Get(q.Var("elem")))
    )
  );

  res.json(response);
}
