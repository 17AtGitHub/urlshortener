const express = require("express");
const URL = require("../models/url");
const router = express.Router();


router.get("/", async (req, res) => {
  const allURLS = await URL.find({});
  return res.render("pages/index", {
    urls: allURLS,
  });
});

router.get("/about", (req, res) => {
  return res.render("pages/about");
})

module.exports = {
  router,
}