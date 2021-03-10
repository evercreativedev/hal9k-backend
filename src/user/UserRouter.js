const express = require("express");
const UserService = require("./UserService");
const UserRouter = express.Router();
const bodyParser = express.json();

UserRouter.route("/hal9k-user")
  .put(bodyParser, (req, res) => {              // Create new user
    const db = req.app.get("db");
    UserService.createUser(db, req.body)
      .then((data) => {
        console.log("DB Response: ", data);
        res.status(200).send(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(200).send(err.message);
      });
  })
  .get(bodyParser, (req, res) => {               // Get user's information
    const db = req.app.get("db");
    const userAddress = req.query.address;
    UserService.getReward(db, userAddress)
      .then((data) => {
        console.log("Get User Data: ", data);
        res.status(200).json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(200).send(err.message);
      });
  })
  .post(bodyParser, (req, res) => {     // Update user's information
    const db = req.app.get("db");

    UserService.updateUser(db, req.body)
      .then((data) => {
        console.log(data);
        res.status(200).send("Successfully updated user infomation");
      })
      .catch((err) => {
        console.log(err);
        res.status(400).send(err.message);
      });
  })
module.exports = UserRouter;
