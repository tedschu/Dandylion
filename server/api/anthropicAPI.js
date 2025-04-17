const express = require("express");
const router = express.Router();
const Anthropic = require("@anthropic-ai/sdk");
const dotenv = require("dotenv");
const path = require("path");

// Points to the .env file
// __dirname specifies the absolute path to the directory (folder) that contains this file (anthropicAPI.js)
// So effectively this is something like '/travel-recs/server/api/' + '..' + '.env'
dotenv.config({ path: path.join(__dirname, "..", ".env") });

// Creates a new, reusable instance of the Anthropic client from the Anthropic SDK, and passes the API key from .env
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Sets up a generic call function to the Anthropic API that accepts two variables (messages, system)
async function callAnthropicAPI(messages, system = "") {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 1500,
      temperature: 0.9,
      system: system,
      messages: messages,
    });

    return response.content; // can change this to response.content[0].text if you just want to return the first text element in the return array
  } catch (error) {
    console.error("error calling the anthropic API:", error);
    throw error;
  }
}

// routes

router.get("/recommendation", (req, res) => {
  try {
    // get passed info from body, put it into message and system prompt arrays, call on caller function, return results
  } catch (error) {}
});

module.exports = router;
