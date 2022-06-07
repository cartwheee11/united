const db = require("../../getDb");
const fauna = require("faunadb");
const config = require("../../config.json");
const q = fauna.query;
const getUser = require("../../service/getUserByIdFromDb.js");
const bcrypt = require("bcrypt");

export default async function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  req.body = JSON.parse(req.body);
  let id = req.body.id;
  let userId = req.body.userId;

  let tutorial = await db.query(q.Get(q.Ref(q.Collection("tutorials"), id)));
  let data = tutorial.data;

  if (!data.accessFrom) {
    res.json(tutorial);
    return;
  }

  let auth = req.body.auth;
  let user = await getUser(userId);

  let hash = null;

  if (user.data.length == 0) {
    res.json({
      error: "bad auth",
    });

    return;
  } else {
    hash = user?.data[0].data?.profile?.auth;
  }

  //authorization
  let compare = bcrypt.compareSync(auth, hash);
  //if yes, chacking perms
  if (compare) {
    //getting publication
    //getting roles ids array
    let minRank = data.accessFrom;
    let userRoles = user.data[0].data.guildProfile.roles;
    let rolesOrder = config.rolesOrder;

    let minimalNecessary = rolesOrder[minRank];
    let userRank = null;

    userRoles.forEach((role) => {
      if (config.rolesReversed[role]) {
        userRank = config.rolesReversed[role];
      }
    });

    let userRankNumber = rolesOrder[userRank];

    if (userRankNumber >= minimalNecessary) {
      res.json(tutorial);
    } else {
      res.json({
        error: "low rank",
      });
    }
  } else {
    res.json({
      error: "bad auth",
    });
  }

  // let after = null;

  // if (id > 1) {
  //   let response = await db.query(
  //     q.Map(
  //       q.Paginate(q.Reverse(q.Documents(q.Collection("tutorials"))), {
  //         size: id,
  //       }),
  //       q.Lambda("elem", q.Get(q.Var("elem")))
  //     )
  //   );

  //   after = response.after[0];
  // } else {
  //   let response = await db.query(
  //     q.Paginate(q.Reverse(q.Documents(q.Collection("tutorials"))), {
  //       size: id + 1,
  //     })
  //   );

  //   after = response.data[id];
  // }

  // res.json(await db.query(q.Get(after)));
}
