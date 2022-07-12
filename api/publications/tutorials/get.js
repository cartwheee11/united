const db = require("../../../api-service/getDb");
const fauna = require("faunadb");
const q = fauna.query;

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  req.body = JSON.parse(req.body);
  let after = req.body.after;
  const size = req.body.size;
  const search = req.body.search;
  let tags = req.body.tags;
  if (!tags) {
    tags = [];
  }
  console.log(search, tags);

  if (after) {
    after = q.Ref(q.Collection("tutorials"), after + "");
  }

  let response;

  if (!tags.length) {
    response = await db.query(
      q.Map(
        q.Paginate(q.Reverse(q.Documents(q.Collection("tutorials"))), {
          size: size,
          after: after,
        }),
        q.Lambda("elem", q.Get(q.Var("elem")))
      )
    );
  } else {
    response = await db.query(
      q.Map(
        q.Paginate(
          q.Reverse(
            q.Reduce(
              q.Lambda(
                ["acc", "value"],
                q.Union(
                  q.Var("acc"),
                  q.Match(q.Index("tutorials-by-tag"), q.Var("value"))
                )
              ),
              q.Match(q.Index("tutorials-by-tag"), ""),
              tags
            )
          ),
          {
            size: size,
            after: after,
          }
        ),
        q.Lambda("elem", q.Get(q.Var("elem")))
      )
    );
  }

  res.json(response);
}
