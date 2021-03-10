const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

const ContractRouter = require('./contract/ContractRouter');
const MetadataRouter = require('./metadata/MetadataRouter');
const UserRouter = require('./user/UserRouter');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static("public"));
app.engine("html", require("ejs").renderFile);

app.use('/', ContractRouter);
app.use('/', MetadataRouter);
app.use('/', UserRouter);

app.use((error, req, res, next) => {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
});

module.exports = app;
