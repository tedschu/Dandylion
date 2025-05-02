const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const path = require("path");
const OpenAI = require("openai");
const { writeFile } = require("fs/promises");
const { write } = require("fs");

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const api = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/image", async (req, res) => {
  try {
    const { location, overview } = req.body;

    console.log(location, overview);

    const response = await api.images.generate({
      model: "gpt-image-1",
      prompt: `Create a vibrant, photo-realistic image of ${location.location} in the style of travel photography. Include iconic landmarks and natural beauty. If there are multiple locations specified (for example: "Peru: machu picchu, lima"), create a collage of up to 4 scenes showing the destination's highlights. Use bright, inviting colors and a simple, postcard-style border around the top and sides of the image. Here is some additional context to include the image as well: ${overview}`,
      n: 1,
      size: "1024x1024",
      // response_format: "url",
    });

    if (response && response.data && response.data.length > 0) {
      res.json(response.data[0]);
    } else {
      throw new Error("No image data returned from OpenAI");
    }

    // TODO: push file to s3 bucket and return URL
    const imageBuffer = Buffer.from(response.data[0].b64_json, "base64");
    await writeFile("../client/src/assets/output.png", imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// NOTE THAT THIS IS TEMPORARY AND SHOULD BE REMOVED WHEN S3 IS SET UP
router.post("/image_second", async (req, res) => {
  try {
    const { location, overview } = req.body;

    console.log(location, overview);

    const response = await api.images.generate({
      model: "gpt-image-1",
      prompt: `Create a vibrant, photo-realistic image of ${location.location} in the style of travel photography. Include iconic landmarks and natural beauty. If there are multiple locations specified (for example: "Peru: machu picchu, lima"), create a collage of up to 4 scenes showing the destination's highlights. Use bright, inviting colors and a simple, postcard-style border around the top and sides of the image. Here is some additional context to include the image as well: ${overview}`,
      n: 1,
      size: "1024x1024",
      // response_format: "url",
    });

    if (response && response.data && response.data.length > 0) {
      res.json(response.data[0]);
    } else {
      throw new Error("No image data returned from OpenAI");
    }

    const imageBuffer = Buffer.from(response.data[0].b64_json, "base64");
    await writeFile("../client/src/assets/output2.png", imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
