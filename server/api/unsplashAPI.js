const express = require("express");
const router = express.Router();
const { createApi } = require("unsplash-js");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const api = createApi({
  accessKey: "Vaye-z1S3eSXskmR1eU9ldC2zCHKLAAGmCMOaEGr7J8",
  fetch: fetch,
});

router.get("/photos", async (req, res) => {
  try {
    // Get search term (destination) and store into variable
    // call api const response = await ..s

    const searchTerm = req.query.query + " landmarks";

    const response = await api.search.getPhotos({
      query: searchTerm,
      page: 1,
      perPage: 10,
      contentFilter: "high",
    });

    res.json(response);
  } catch (error) {
    console.error("Error calling the API:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
