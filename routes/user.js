//will contain all of my user routes
const express = require("express");
const router = express.Router();
const mysql = require("mysql");
router.get("./messages", (req, res) => {
  console.log("Show some messages");
  res.end();
});

router.get("/users", (req, res) => {
  const connection = getConnection();
  const queryAll = "SELECT * from new_table";
  connection.query(queryAll, (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users " + err);
      res.sendStatus(500);
      return;
    }
    console.log("fetched users from database");
    res.json(rows);
  });
});

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "us-cdbr-iron-east-05.cleardb.net",
  user: "b71bb0404adfb8",
  password: "50cb7686",
  database: "heroku_c2bd1b25a10d091"
});

function getConnection() {
  return pool;
}

router.get("/user/:id", (req, res) => {
  console.log("fetching user with id " + req.params.id);

  const connection = getConnection();

  const userID = req.params.id;
  const queryString = "SELECT * FROM new_table WHERE id=?";
  connection.query(queryString, [userID], (err, rows, fields) => {
    if (err) {
      console.log("Failed to query for users " + err);
      res.sendStatus(500);
      return;
    }

    const users = rows.map(row => {
      return { firstName: row.first_name, lastName: row.last_name };
    });
    console.log("I think we fetched the right user");
    res.json(users);
  });
});

router.post("/user_create", (req, res) => {
  console.log("trying to add user to db");

  const firstName = req.body.create_firstname;
  const lastName = req.body.create_lastname;

  const queryString =
    "INSERT into new_table (first_name, last_name) VALUES (?,?)";
  getConnection().query(
    queryString,
    [firstName, lastName],
    (err, results, fields) => {
      if (err) {
        console.log("failed to insert user" + err);
        res.sendStatus(500);
        return;
      }
      console.log("Inserted a new user with id ", results.insertId);
      res.end();
    }
  );

  res.end();
});

module.exports = router;
