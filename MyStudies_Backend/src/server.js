const express = require("express");
const cors = require("cors");
const db = require("./db/models")
const routes = require("./routes.js");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);