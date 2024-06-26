const express = require("express");
const router = express.Router();
const { handleGenerateNewShortURL,
        handleGetURLAtShortId,
        handleGetAnalyticsShortURL, 
        handleDeleteShortURL } = require("../controllers/url")

// routers for each HTTP method at /url
router.post("/", handleGenerateNewShortURL);

// get req at the shortid url route
router.get("/:shortId", handleGetURLAtShortId);

router.get("/analytics/:shortId", handleGetAnalyticsShortURL);

router.delete("/:shortId", handleDeleteShortURL);

module.exports = {
  router,
}