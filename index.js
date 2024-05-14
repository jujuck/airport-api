const express = require("express");
require("dotenv").config();

const app = express();

app.listen(5000, () => {
  console.info("Le serveur tourne sur le http://localhost:5000");
});
