const getUser = require("../service/getUserByIdFromDb");

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  let response = await getUser(req.body + "");

  res.json(response);
}
