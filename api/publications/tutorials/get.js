const db = require("../../getDb");
const fauna = require("faunadb");
const q = fauna.query;
const getUser = require("../../service/getUserByIdFromDb");
const config = require("../../config.json");

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  req.body = JSON.parse(req.body);
  let after = req.body.after;
  const size = req.body.size;

  //check user perms
  const user = await getUser(req.body.userId);

  if (!user.data.length) {
    res.json(false);
    return;
  }

  const userRoles = user.data[0].data.guildProfile.roles;
  const roles = config.roles;

  let isAllowd = false;

  for (let key in roles) {
    if (userRoles.indexOf(roles[key]) > 0) {
      isAllowd = true;
    }
  }

  if (isAllowd) {
    if (after) {
      after = q.Ref(q.Collection("tutorials"), after + "");
    }

    let response = await db.query(
      q.Map(
        q.Paginate(q.Reverse(q.Documents(q.Collection("tutorials"))), {
          size: size,
          after: after,
        }),
        q.Lambda("elem", q.Get(q.Var("elem")))
      )
    );

    res.json(response);
  } else {
    res.json(false);
  }
}
