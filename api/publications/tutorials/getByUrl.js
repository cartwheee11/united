const db = require("../../getDb");
const fauna = require("faunadb");
const q = fauna.query;

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  req.body = JSON.parse(req.body);
  let url = req.body.url;

  console.log(url);

  let response = db.query(
    q.Map(
      q.Paginate(q.Match(q.Index("tutorial-by-telegraph-url"), url)),
      q.Lambda("elem", q.Get(q.Var("elem")))
    )
  );

  // console.log(await response);
  let json = await response;

  res.json(json.data[0].data);
}
