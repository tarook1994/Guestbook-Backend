const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const port = process.env.PORT;
require("./db/db");
const app = express().use("*", cors());

const morganInstance = morgan(function(tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"),
    "-",
    tokens["response-time"](req, res),
    "ms"
  ].join(" ");
});

app.use(morganInstance);

app.use(bodyParser.json());

app.use("/api/v1", userRoutes);

app.listen(port, async () => {
  console.log(`Connected port ${port}`);
});
