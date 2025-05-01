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

// TODO: needs to pass in the location from Anthropic response
router.get("/image", async (req, res) => {
  try {
    const response = await api.images.generate({
      model: "dall-e-3",
      prompt:
        "make a realistic-looking, collage image in the style of a postcard of chicago and the midwest prairie.",
      n: 1,
      size: "1024x1024",
      response_format: "url",
    });

    if (response && response.data && response.data.length > 0) {
      res.json(response.data[0]);
    } else {
      throw new Error("No image data returned from OpenAI");
    }

    // const imageBuffer = Bugger.from(img.data[0].b64_json, "base64");
    // await writeFile("output.png", imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Commented out text generation route
// router.get("/text", async (req, res) => {
//   try {
//     const response = await api.responses.create({
//       model: "gpt-4o-mini",
//       instructions: "Talk like a pirate.",
//       input: "Are semicolons optional in JavaScript?",
//     });

//     console.log(response);

//     const data = response.output_text;

//     console.log(data);

//     res.json(data);
//   } catch (error) {}
// });

module.exports = router;
