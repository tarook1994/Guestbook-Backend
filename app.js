const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const port = process.env.PORT;
require("./db/db");

const app = express().use("*", cors());

app.use(bodyParser.json());

app.use("/api/v1", userRoutes);

app.listen(port, async () => {
  console.log(`Connected port ${port}`);
});
