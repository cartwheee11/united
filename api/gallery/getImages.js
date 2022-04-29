const fauna = require("faunadb");
const db = require("../getDb");

let q = fauna.query;

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const { from, number } = await req.json();
  console.log(from, number);
  console.log(req.body);

  res.json("Что-то");
}
