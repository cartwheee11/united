const db = require("../getDb");
const fauna = require("faunadb");
const q = fauna.query;

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  const body = JSON.parse(req.body);
  // let response = await getUser(req.body + "");
  const response = await db.query(
    q.Map(
      q.Paginate(q.Reverse(q.Documents(q.Collection("users"))), {
        size: body.size,
        after: body.after,
      }),
      q.Lambda("elem", q.Get(q.Var("elem")))
    )
  );

  res.json(response);
}
