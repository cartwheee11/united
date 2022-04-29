const db = require("../../getDb");
const fauna = require("faunadb");
const q = fauna.query;

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  req.body = JSON.parse(req.body);
  let id = req.body.id;

  let after = null;

  if (id > 1) {
    let response = await db.query(
      q.Map(
        q.Paginate(q.Reverse(q.Documents(q.Collection("tutorials"))), {
          size: id,
        }),
        q.Lambda("elem", q.Get(q.Var("elem")))
      )
    );

    after = response.after[0];
  } else {
    let response = await db.query(
      q.Paginate(q.Reverse(q.Documents(q.Collection("tutorials"))), {
        size: id + 1,
      })
    );

    after = response.data[id];
  }

  res.json(await db.query(q.Get(after)));
}
