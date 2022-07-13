const db = require("../../../api-service/getDb");
const fauna = require("faunadb");
const q = fauna.query;
const {
  Map,
  Reduce,
  Var,
  Paginate,
  Filter,
  Get,
  Reverse,
  Union,
  Match,
  Index,
  Lambda,
  Let,
  ContainsStr,
  Select,
  If,
  Documents,
  LowerCase,
  Collection,
  IsNonEmpty,
} = require("faunadb");

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

  response = await db.query(
    Let(
      {
        matches: If(
          IsNonEmpty(tags),
          Map(
            tags,
            Lambda("elem", Match(Index("tutorials-by-tag"), Var("elem")))
          ),
          [Documents(Collection("tutorials"))]
        ),
        union: Reduce(
          Lambda(["acc", "value"], Union(Var("acc"), Var("value"))),
          Match(q.Index("tutorials-by-tag"), "asekgharsghskjgh"),
          Var("matches")
        ),
        sorted: Reverse(Var("union")),
        filtered: Filter(
          Var("sorted"),
          Lambda(
            "item",
            ContainsStr(
              LowerCase(Select(["data", "title"], Get(Var("item")))),
              search.toLowerCase()
            )
          )
        ),
      },
      Map(
        Paginate(Var("filtered"), { size, after }),
        Lambda("elem", Get(Var("elem")))
      )
    )
  );

  // response = await db.query(
  //   q.Map(
  //     q.Paginate(
  //       q.Filter(
  //         q.Reverse(
  //           q.Reduce(
  //             q.Lambda(
  //               ["acc", "value"],
  //               q.Union(
  //                 q.Var("acc"),
  //                 q.Match(q.Index("tutorials-by-tag"), q.Var("value"))
  //               )
  //             ),
  //             q.Match(q.Index("tutorials-by-tag"), ""),
  //             tags
  //           )
  //         )
  //       ),
  //       {
  //         size: size,
  //         after: after,
  //       }
  //     ),
  //     q.Lambda("elem", q.Get(q.Var("elem")))
  //   )
  // );

  res.json(response);
}
