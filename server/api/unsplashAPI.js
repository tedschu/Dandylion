const express = require("express");
const router = express.Router();
import { create } from "domain";
import { createApi } from "unsplash-js";
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const api = createApi({
  accessKey: "Vaye-z1S3eSXskmR1eU9ldC2zCHKLAAGmCMOaEGr7J8",
});

router.get("/photos", async (req, res) => {
  try {
    // Get search term (destination) and store into variable
    // call api const response = await ..s
  } catch (error) {}
});
