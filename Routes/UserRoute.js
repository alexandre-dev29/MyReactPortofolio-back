const express = require("express");

const router = express.Router();

/**GET request for the home page */

router.get("/", (req, res) => {
  res.send("Voici la page d'accueil");
});

module.exports = router;
