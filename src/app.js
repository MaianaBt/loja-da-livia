const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const routes = require("./routes");

require("./database");

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({ limit: "5mb", extended: false }));
app.use(morgan("tiny"));

// Routes
app.use("/", routes);

module.exports = app;
