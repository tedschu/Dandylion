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
      max_tokens: 4000,
      temperature: 0.9,
      system: system,
      messages: messages,
    });

    return response.content[0].text; // can change this to response.content[0].text if you just want to return the first text element in the return array
  } catch (error) {
    console.error("error calling the anthropic API:", error);
    throw error;
  }
}

// routes

// POSTs the questions + user responses to Anthropic messages API, returning the travel recommendations
router.post("/recommendation", async (req, res) => {
  try {
    // get passed info from body, put it into message and system prompt arrays, call on caller function, return results
    const {
      question1,
      response1,
      question2,
      response2,
      question3,
      response3,
      question4,
      response4,
      question5,
      response5,
      question6,
      response6,
      question7,
      response7,
      question8,
      response8,
      question9,
      response9,
    } = req.body;

    // "stringify" the data to pass to Anthropic, e.g. convert the data object to a string
    const responseString = JSON.stringify({
      question1: question1,
      response1: response1,
      question2: question2,
      response2: response2,
      question3: question3,
      response3: response3,
      question4: question4,
      response4: response4,
      question5: question5,
      response5: response5,
      question6: question6,
      response6: response6,
      question7: question7,
      response7: response7,
      question8: question8,
      response8: response8,
      question9: question9,
      response9: response9,
    });

    const messages = [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Using the object below, review the questions and then the user's responses to those questions. You will then be returning recommendations on vacation destination that you think would be the best fit for them based on their responses in the format specified below ("destination"), as well as one additional recommendation in the same format ("second_destination"), for their reference. Only return the JSON object requested below, nothing else. 

Make sure that your recommendations follow the parameters of the user's responses. For example, if they say they want to go to a beach destination during the fall, avoid recommending destinations where the fall is the primary hurricane season. 

Here is the user object with the questions and responses:

${responseString}

Return ONLY a valid, properly escaped JSON object with the following structure:

{
  "destination": {
    "location": "Recommended destination (can be specific town or multiple destinations)",
    "overview": "3-4 sentences explaining why this recommendation fits user preferences. In this overview, you can also expand on the destinations that you're recommending, if appropriate. So for example, if you recommend Bordeaux and Nice in France, in this overview you can talk about how the broader region ("south of France") fits with their preferences",
    "places_to_stay": "Specific accommodation suggestions that match user's budget and preferences. For example, if there is a particular resort that gets great reviews and falls within the user's budget, recommend that and note where the resort is. If the user has noted that they want to stay in a remote place, and for example, you find that AirBnb accommodations are popular, recommend that they check out home rentals and note specific locations that would be best based on their preferences",
    "photos": "[]",
    "things_to_do": [
      {
        "destination_name": "Attraction/activity name. These recommendations should be specific places, destinations, or things to do that fit with the user's preferences. For instance, if the user has specified wanting to see cultural experiences, make sure that you are focusing on things like historical sites, cultural events (e.g. Mardis Gras). Don't just focus on the most popular destinations or things to do, but reference reviews on the internet and recommendations that would be a best fit to the user's preferences.",
        "description": "2-3 sentence description of this activity and why it fits user preferences",
      },
      // Include 5-7 more activity objects following this format
    ],
    "time_to_go": "Best months/seasons to visit based on user preferences",
    "estimated_cost": "Cost range (e.g., '$5,000 - $7,000 USD') with brief explanation. For instance, if the user is coming from Chicago and has to fly to Florence (if this is the recommended destination), you can look at average ticket prices. You can also look at hotels or places to stay that fit their preferences, and see what the cost per night is in the time of year that they want to travel",
    "helpful_tips": "Key insights for travel to this destination (language, currency, etc.)"
  },
  "second_destination": {
    // Same structure as above for an alternative recommendation
  }
}

JSON FORMATTING REQUIREMENTS:
1. All string values must be on a single line with no actual line breaks
2. Use "\\n" for necessary line breaks within text
3. Properly escape all quotes, backslashes and special characters in string values
4. Ensure all array and object structures are valid JSON
5. All URLs in photo arrays must be properly formatted and escaped
6. Do not include any markdown, backticks, or text outside the JSON object`,
          },
        ],
      },
    ];

    const system =
      "Imagine that you are a travel agent, but with all of the information from the internet at your disposal. You are helping users find a vacation destination that best fits their preferences based on information that they give you. You should respond with a sense of humor, and enthusiasm for the trip that they are planning. ";

    // Call anthropic API function to hit the API and return a response
    const response = await callAnthropicAPI(messages, system);

    console.log(response);
    const parsedResponse = JSON.parse(response);

    // const cleanedResponse = response.replace(/\\'/g, "'");

    //const finalResponse = JSON.parse(response);

    res.json(parsedResponse);
  } catch (error) {
    console.error("Error returning data:", error);
    res.status(500).json({
      error: "Failed to retrieve a response",
      response: error.response,
    });
  }
});

module.exports = router;
