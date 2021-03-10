const express = require("express");
const MetadataService = require("./MetadataService");
const MetadataRouter = express.Router();
const bodyParser = express.json();

MetadataRouter.route("/hals/:id").get((req, res, next) => {
  const db = req.app.get("db");
  const tokenId = parseInt(req.params.id).toString();
  MetadataService.getMetadataById(db, tokenId)
    .then((data) => {
      const { name, description, image, rarity, set, max_supply } = data;
      const metadata = {
        pool: {
          name: "V1968",
          points: 1,
        },
        external_url: `https://api.hal9k.ai/hals/${tokenId}`,
        image,
        name,
        description,
        attributes: [
          {
            trait_type: "Set",
            value: set,
          },
          {
            trait_type: "Rarity",
            value: rarity,
          },
          {
            trait_type: "Max Supply",
            value: max_supply,
          },
        ],
      };
      res.status(200).json(metadata);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).send(err.message);
    });
});

MetadataRouter.route("/hals").put(bodyParser, (req, res, next) => {
  const db = req.app.get("db");
  MetadataService.createMetadata(db, req.body)
    .then((data) => {
      console.log(data);
      res.status(200).send("Successfully added");
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).send(err.message);
    });
});

MetadataRouter.route("/pools/:set").get((req, res, next) => {
  const db = req.app.get("db");
  const set = req.params.set.toString();
  MetadataService.getMetadataBySet(db, set)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(400).send(err.message);
    });
});
module.exports = MetadataRouter;
