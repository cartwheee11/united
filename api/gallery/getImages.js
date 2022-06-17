const fauna = require("faunadb");
const db = require("../getDb");

let q = fauna.query;

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  req.body = JSON.parse(req.body);
  const size = req.body.size;
  let after = undefined;
  let afterId = null;
  if (req.body.after) {
    after = req.body.after;
    let id = after[0]["@ref"].id;
    after = q.Ref(q.Collection("tutorials"), id);
    console.log(afterId);
  }

  // console.log(size, after);

  let response = await db.query(
    q.Map(
      q.Paginate(q.Reverse(q.Documents(q.Collection("gallery"))), {
        size,
        after,
      }),
      q.Lambda("elem", q.Get(q.Var("elem")))
    )
  );

  res.json(response);
}
