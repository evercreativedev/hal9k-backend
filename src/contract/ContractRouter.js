const express = require("express");
const ContractService = require("./ContractService");
const ContractRouter = express.Router();

ContractRouter.route("/contract/hal9k-erc1155").get((req, res, next) => {
  const db = req.app.get("db");
  ContractService.getAllContracts(db)
    .then((data) => {
      const { name, description, image, external_link } = data;
      const metadata = {
        name,
        description,
        image,
        external_link,
      };
      res.status(200).json(metadata);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).send(err.message);
    });
});

module.exports = ContractRouter;
