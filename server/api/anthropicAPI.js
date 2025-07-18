import express, { response } from "express";
const router = express.Router();
import Anthropic from "@anthropic-ai/sdk";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
      model: "claude-sonnet-4-20250514",
      max_tokens: 10000,
      // model: "claude-3-5-haiku-20241022",
      // max_tokens: 8192,
      temperature: 0.4,
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

// "Unknown" path (e.g. user needs a destination and itinerary / suggestions) call to get recommendations
router.post("/recommendation-unknown-first", async (req, res) => {
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
      question10,
      response10,
      firstName,
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
      question10: question10,
      response10: response10,
      firstName: firstName,
    });

    const messages = [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Using the object below, review the questions and then the user's responses to those questions. You will then be returning recommendations on a vacation destination that you think would be the best fit for them based on their responses in the format specified below ("destination"). Only return the JSON object requested below, nothing else. Do not ask for confirmation - provide the complete JSON response immediately.

Make sure that your recommendations follow the parameters of the user's responses. For example, if they say they want to go to a beach destination during the fall, avoid recommending destinations where the fall is the primary hurricane season. For example, if they note that their budget is $5,000, don't recommend a vacation that will cost more than that.

Write your response as if you were speaking to them (ex. "You will love this area..."), using their first name: ${firstName}.

Here is the user object with the questions and responses:

${responseString}

CRITICAL INSTRUCTIONS:
- Your ENTIRE response must be a single, valid JSON object
- Do NOT include any text outside the JSON
- Do NOT use markdown backticks like \`\`\`json
- All string values must be properly escaped
- All arrays must be valid JSON arrays, not strings containing array-like text

DETAILED REQUIREMENTS FOR EACH FIELD:

DESTINATION LOCATION:
- Must be a specific town/city or region, not the user's home city
- Should match user's climate, activity, and cultural preferences

OVERVIEW:
- Write 3-4 sentences as if speaking directly to the user
- Explain why this destination fits their specific preferences
- Use their first name and enthusiastic tone

PLACES TO STAY:
- Provide 3-4 specific accommodation recommendations
- Match user's budget and accommodation preferences (hotel/resort/airbnb/etc)
- Include specific resort names if they fit budget and get great reviews
- For remote preferences, focus on home rentals and specific neighborhoods
- Each entry must include realistic price ranges

THINGS TO DO:
- Provide 6-8 specific, named attractions/activities
- Focus on user's stated interests (cultural experiences = historical sites, festivals like Mardi Gras)
- Don't just list popular tourist spots - choose activities that match their preferences
- Reference quality and reviews when recommending
- Each activity needs 2-3 sentences explaining why it fits their preferences

RESTAURANTS:
- Provide 3-4 specific restaurant recommendations
- Include restaurant names, not just cuisine types
- Focus on highly-rated establishments that match user's dining preferences
- Consider any dietary restrictions mentioned

ITINERARY:
- Create day-by-day plans for the full length of stay specified by user
- Include specific timing (morning/afternoon/evening)
- Use actual restaurant and attraction names from your recommendations above
- Plan logical geographic flow to minimize travel time
- Include transportation suggestions between activities
- Provide weather backup options
- Ensure realistic pacing with appropriate time allocations
- Each day should have 100-150 words minimum of detailed planning

Return ONLY this JSON structure:

{
  "destination": {
    "location": "string",
    "overview": "string", 
    "places_to_stay": [
      {
        "name": "string",
        "type": "string",
        "location": "string", 
        "why_recommended": "string",
        "price_range": "string"
      }
    ],
    "things_to_do": [
      {
        "destination_name": "string",
        "description": "string"
      }
    ],
    "restaurants": [
      {
        "restaurant_name": "name of restaurant",
        "restaurant_type": "type of cuisine",
        "description": "overview of the restaurant and why it fits the user"
      }
    ],
    "time_to_go": "Best months/seasons to visit based on user preferences",
    "length_of_stay": "Length of stay based on user input",
    "estimated_cost": "Cost range with brief explanation",
    "helpful_tips": "Key insights for travel to this destination",
    "itinerary": [
      {
        "day_num": 1,
        "summary": "Brief summary of the day's destinations",
        "morning": "Detailed recommendations for activities and dining",
        "afternoon": "Detailed recommendations for activities and dining",
        "evening": "Detailed recommendations for activities and dining"
      }
    ]
  },
  second_destination: {
    // leave this as an empty object
  }
}

IMPORTANT FORMATTING RULES:
1. Include 3-4 places_to_stay entries
2. Include 6-8 things_to_do entries
3. Include 3-4 restaurant entries
4. Create itinerary for the full length of stay specified by user
5. All text must be single-line strings with no actual line breaks
6. Use specific names for restaurants, attractions, and accommodations
7. Ensure cost estimates align with user's stated budget
8. Do not recommend destinations in the user's home city

Your response must be parseable by JSON.parse() with no modifications.`,
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

// Call to get second set of recommendations (server-side)
router.post("/recommendation-unknown-second", async (req, res) => {
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
      question10,
      response10,
      firstName,
      firstDestination,
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
      question10: question10,
      response10: response10,
      firstName: firstName,
      firstDestination: firstDestination,
    });

    const messages = [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Using the object below, review the questions and then the user's responses to those questions. You will then be returning recommendations on a vacation destination that you think would be the best fit for them based on their responses in the format specified below ("destination"). 

            This destination recommendation must be COMPLETELY SEPARATE AND UNRELATED to ${firstDestination}. Do not reference any attractions, restaurants, or accommodations from ${firstDestination}. This is an entirely different vacation option. 

            Make sure that your recommendations follow the parameters of the user's responses. For example, if they say they want to go to a beach destination during the fall, avoid recommending destinations where the fall is the primary hurricane season. For example, if they note that their budget is $5,000, don't recommend a vacation that will cost more than that.

Write your response as if you were speaking to them (ex. "You will love this area..."), using their first name: ${firstName}.

Here is the user object with the questions and responses:

${responseString}

CRITICAL INSTRUCTIONS:
- Your ENTIRE response must be a single, valid JSON object
- Do NOT include any text outside the JSON
- Do NOT use markdown backticks like \`\`\`json
- All string values must be properly escaped
- All arrays must be valid JSON arrays, not strings containing array-like text
- ALL recommendations (restaurants, hotels, attractions) must be located in or near the destination you choose ONLY
- Do NOT include any recommendations from ${firstDestination} or any other location

DETAILED REQUIREMENTS FOR EACH FIELD:

LOCATION:
- Must be a specific town/city or region, not the user's home city
- Should match user's climate, activity, and cultural preferences

OVERVIEW:
- Write 3-4 sentences as if speaking directly to the user
- Explain why this destination fits their specific preferences
- Use their first name and enthusiastic tone

PLACES TO STAY:
- Provide 3-4 specific accommodation recommendations
- Match user's budget and accommodation preferences (hotel/resort/airbnb/etc)
- Include specific resort names if they fit budget and get great reviews
- For remote preferences, focus on home rentals and specific neighborhoods
- Each entry must include realistic price ranges

THINGS TO DO:
- Provide 6-8 specific, named attractions/activities
- Focus on user's stated interests (cultural experiences = historical sites, festivals like Mardi Gras)
- Don't just list popular tourist spots - choose activities that match their preferences
- Reference quality and reviews when recommending
- Each activity needs 2-3 sentences explaining why it fits their preferences

RESTAURANTS:
- Provide 3-4 specific restaurant recommendations
- Include restaurant names, not just cuisine types
- Focus on highly-rated establishments that match user's dining preferences
- Consider any dietary restrictions mentioned

ITINERARY:
- Create day-by-day plans for the full length of stay specified by user
- Include specific timing (morning/afternoon/evening)
- Use actual restaurant and attraction names from your recommendations above
- Plan logical geographic flow to minimize travel time
- Include transportation suggestions between activities
- Provide weather backup options
- Ensure realistic pacing with appropriate time allocations
- Each day should have 100-150 words minimum of detailed planning

Return ONLY this JSON structure:

  {
    "location": "string",
    "overview": "string", 
    "places_to_stay": [
      {
        "name": "string",
        "type": "string",
        "location": "string", 
        "why_recommended": "string",
        "price_range": "string"
      }
    ],
    "things_to_do": [
      {
        "destination_name": "string",
        "description": "string"
      }
    ],
    "restaurants": [
      {
        "restaurant_name": "name of restaurant",
        "restaurant_type": "type of cuisine",
        "description": "overview of the restaurant and why it fits the user"
      }
    ],
    "time_to_go": "Best months/seasons to visit based on user preferences",
    "length_of_stay": "Length of stay based on user input",
    "estimated_cost": "Cost range with brief explanation",
    "helpful_tips": "Key insights for travel to this destination",
    "itinerary": [
      {
        "day_num": 1,
        "summary": "Brief summary of the day's destinations",
        "morning": "Detailed recommendations for activities and dining",
        "afternoon": "Detailed recommendations for activities and dining",
        "evening": "Detailed recommendations for activities and dining"
      }
    ]
  }

IMPORTANT FORMATTING RULES:
1. Include 3-4 places_to_stay entries
2. Include 6-8 things_to_do entries
3. Include 3-4 restaurant entries
4. Create itinerary for the full length of stay specified by user
5. All text must be single-line strings with no actual line breaks
6. Use specific names for restaurants, attractions, and accommodations
7. Ensure cost estimates align with user's stated budget
8. Do not recommend destinations in the user's home city

Your response must be parseable by JSON.parse() with no modifications.`,
          },
        ],
      },
    ];

    const system =
      "Imagine that you are a travel agent, but with all of the information from the internet at your disposal. You are helping users find a vacation destination that best fits their preferences based on information that they give you. You should respond with a sense of humor, and enthusiasm for the trip that they are planning. ";

    // Call anthropic API function to hit the API and return a response
    const response = await callAnthropicAPI(messages, system);

    console.log("This is response in the second Anthropic route:", response);
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

// "Known" path (e.g. user knows destination already) call to get recommendations
router.post("/recommendation-known", async (req, res) => {
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
      firstName,
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
      firstName: firstName,
    });

    const messages = [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Using the object below, review the questions and then the user's responses to those questions. You will then be returning vacation recommendations that you think would be the best fit for them based on their responses in the format specified below. Only return the JSON object requested below, nothing else. 

Make sure that your recommendations follow the parameters of the user's responses. For example, if they note that their budget is $5,000, don't recommend a vacation that will cost more than that.

Write your response as if you were speaking to them (ex. "You will love this area..."), using their first name: ${firstName}.

Here is the user object with the questions and responses:

${responseString}

CRITICAL INSTRUCTIONS:
- Your ENTIRE response must be a single, valid JSON object
- Do NOT include any text outside the JSON
- Do NOT use markdown backticks like \`\`\`json
- All string values must be properly escaped
- All arrays must be valid JSON arrays, not strings containing array-like text

DETAILED REQUIREMENTS FOR EACH FIELD:

DESTINATION LOCATION:
- Must be a specific town/city or region, not the user's home city
- Should match user's climate, activity, and cultural preferences

OVERVIEW:
- Write 3-4 sentences as if speaking directly to the user
- Explain why this destination fits their specific preferences
- Use their first name and enthusiastic tone

PLACES TO STAY:
- Provide 3-4 specific accommodation recommendations
- Match user's budget and accommodation preferences (hotel/resort/airbnb/etc)
- Include specific resort names if they fit budget and get great reviews
- For remote preferences, focus on home rentals and specific neighborhoods
- Each entry must include realistic price ranges

THINGS TO DO:
- Provide 6-8 specific, named attractions/activities
- Focus on user's stated interests (cultural experiences = historical sites, festivals like Mardi Gras)
- Don't just list popular tourist spots - choose activities that match their preferences
- Reference quality and reviews when recommending
- Each activity needs 2-3 sentences explaining why it fits their preferences

RESTAURANTS:
- Provide 3-4 specific restaurant recommendations
- Include restaurant names, not just cuisine types
- Focus on highly-rated establishments that match user's dining preferences
- Consider any dietary restrictions mentioned

ITINERARY:
- Create day-by-day plans for the full length of stay specified by user
- Include specific timing (morning/afternoon/evening)
- Use actual restaurant and attraction names from your recommendations above
- Plan logical geographic flow to minimize travel time
- Include transportation suggestions between activities
- Provide weather backup options
- Ensure realistic pacing with appropriate time allocations
- Each day should have 100-150 words minimum of detailed planning

Return ONLY this JSON structure:

{
  "destination": {
    "location": "string",
    "overview": "string", 
    "places_to_stay": [
      {
        "name": "string",
        "type": "string",
        "location": "string", 
        "why_recommended": "string",
        "price_range": "string"
      }
    ],
    "things_to_do": [
      {
        "destination_name": "string",
        "description": "string"
      }
    ],
    "restaurants": [
      {
        "restaurant_name": "name of restaurant",
        "restaurant_type": "type of cuisine",
        "description": "overview of the restaurant and why it fits the user"
      }
    ],
    "time_to_go": "Best months/seasons to visit based on user preferences",
    "length_of_stay": "Length of stay based on user input",
    "estimated_cost": "Cost range with brief explanation",
    "helpful_tips": "Key insights for travel to this destination",
    "itinerary": [
      {
        "day_num": 1,
        "summary": "Brief summary of the day's destinations",
        "morning": {
          "time": "9AM - 12PM",
          "activities": "Detailed morning activities",
          "dining": "Breakfast or brunch recommendations."
        },
        "afternoon": {
          "time": "12PM - 5PM",
          "activities": "Detailed afternoon activities",
          "dining": "Lunch recommendations"
        },
        "evening": {
          "time": "5PM - 9PM",
          "activities": "Evening plans",
          "dining": "Dinner suggestions"
        }
      }
    ]
  },
}

FORMATTING REQUIREMENTS:
- Include 3-4 places to stay, 6-8 activities, 3-4 restaurants
- Use specific names for all recommendations
- Ensure costs align with stated budget
- Single-line strings only (no line breaks)

Your response must be parseable by JSON.parse() with no modifications.`,
          },
        ],
      },
    ];

    const system =
      "You are an enthusiastic local travel expert who loves sharing detailed, insider knowledge. Write as if you're personally guiding a friend through the destination. Be conversational, specific, and generous with details - include timing, what to expect, why places are special, and practical tips.";

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

// **** BELOW ARE THE ROUTES FOR USER-REVISED PLANS (e.g. user wants to revise based on their preferences)

// User-revised plan_data for all "known" and "unknown" plans (the prompt specifies the format)
router.post("/user-revised-recommendation", async (req, res) => {
  try {
    // get passed info from body, put it into message and system prompt arrays, call on caller function, return results
    const { plan_data, user_feedback } = req.body;

    console.log(plan_data, user_feedback);

    const messages = [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `Update the JSON object of travel recommendations below by incorporating the user feedback into the suggestions. Only modify the elements that are relevant to the user_feedback. Leave the rest the same.

Make sure that your recommendations follow the parameters of the user's responses and stay within any budget or other constraints mentioned.

Return the travel plan object in the EXACT same format and structure as the input, but with revised content based on the user feedback.

INPUT JSON STRUCTURE TO PRESERVE:
${JSON.stringify(plan_data, null, 2)}

User feedback: ${user_feedback}

CRITICAL INSTRUCTIONS:
- Your ENTIRE response must be a single, valid JSON object
- Do NOT include any text outside the JSON
- Do NOT use markdown backticks like \`\`\`json
- Your response must be parseable by JSON.parse() with no modifications
- Maintain the EXACT same structure as the input JSON above
- Only change the content/values, never the keys or overall structure`,
          },
        ],
      },
    ];

    const system = `You are an enthusiastic travel agent with access to comprehensive travel information. Help users revise their vacation plans based on their feedback. Respond with humor and enthusiasm while ensuring all recommendations are practical and within their constraints.

Your response must be valid JSON only - no additional text or formatting.`;

    // Call anthropic API function to hit the API and return a response
    const response = await callAnthropicAPI(messages, system);

    console.log("Raw API response:", response);
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

export default router;

// ***** FORMAT FOR KNOWN ITINERARY ROUTE
// Ensure the text is in the following format: [
//     {
//      "day_num": 1,
//      "summary": "Provide a brief summary of the day's destinations",
//   "morning": {
//     "time": "9AM - 12PM",
//     "activities": "Start your day exploring Chinatown, beginning at the iconic Dragon Gate on Grant Avenue. Spend time browsing the traditional herb shops, tea stores, and souvenir markets along Grant Avenue and Stockton Street. Don't miss the beautiful murals in Portsmouth Square and the historic temples like Tin How Temple. The narrow alleyways like Waverly Place offer authentic glimpses of daily life. Allow 2-3 hours to properly explore this vibrant neighborhood, and consider timing your visit to catch the morning dim sum crowds for an authentic cultural experience.",
//     "dining": "For breakfast, head to Golden Boy Pizza on Green Street for their famous focaccia squares - they offer excellent vegetarian options including their margherita and veggie combinations. The casual atmosphere and local favorite status make it perfect for starting your San Francisco adventure."
//   },
//     "afternoon": {
//       "time": "12PM - 5PM",
//       "activities": "Detailed afternoon activities",
//       "dining": "Lunch recommendations"
//     },
//     "evening": {
//       "time": "5PM - 9PM",
//       "activities": "Evening plans",
//       "dining": "Dinner suggestions"
//     }
//   },
//          // Include additional days in this format
//     ]",
//   },

// 1. All string values must be on a single line with no actual line breaks

// ***** COMMENTING OUT THE EXISTING UNKNOWN ROUTE WHILE TESTING. CAN DELETE.

// // "Unknown" path (e.g. user needs a destination and itinerary / suggestions) call to get recommendations
// router.post("/recommendation-unknown-first", async (req, res) => {
//   try {
//     // get passed info from body, put it into message and system prompt arrays, call on caller function, return results
//     const {
//       question1,
//       response1,
//       question2,
//       response2,
//       question3,
//       response3,
//       question4,
//       response4,
//       question5,
//       response5,
//       question6,
//       response6,
//       question7,
//       response7,
//       question8,
//       response8,
//       question9,
//       response9,
//       question10,
//       response10,
//       firstName,
//     } = req.body;

//     // "stringify" the data to pass to Anthropic, e.g. convert the data object to a string
//     const responseString = JSON.stringify({
//       question1: question1,
//       response1: response1,
//       question2: question2,
//       response2: response2,
//       question3: question3,
//       response3: response3,
//       question4: question4,
//       response4: response4,
//       question5: question5,
//       response5: response5,
//       question6: question6,
//       response6: response6,
//       question7: question7,
//       response7: response7,
//       question8: question8,
//       response8: response8,
//       question9: question9,
//       response9: response9,
//       question10: question10,
//       response10: response10,
//       firstName: firstName,
//     });

//     const messages = [
//       {
//         role: "user",
//         content: [
//           {
//             type: "text",
//             text: `Using the object below, review the questions and then the user's responses to those questions. You will then be returning recommendations on a vacation destination that you think would be the best fit for them based on their responses in the format specified below ("destination"). Only return the JSON object requested below, nothing else. Do not ask for confirmation - provide the complete JSON response immediately.

// Make sure that your recommendations follow the parameters of the user's responses. For example, if they say they want to go to a beach destination during the fall, avoid recommending destinations where the fall is the primary hurricane season. For example, if they note that their budget is $5,000, don't recommend a vacation that will cost more than that.

// Write your response as if you were speaking to them (ex. "You will love this area..."), using their first name: ${firstName}.

// Here is the user object with the questions and responses:

// ${responseString}

// Return ONLY a valid, properly escaped JSON object with the following structure:

// {
//   "destination": {
//     "location": "Recommended destination (can be specific town or multiple destinations). Make sure that your recommendation is not the town that they live in (for example, if the user said they live in Minneapolis, do not recommend a trip to Minneapolis)",
//     "overview": "3-4 sentences explaining why this recommendation fits user preferences. In this overview, you can also expand on the destinations that you're recommending, if appropriate. So for example, if you recommend Bordeaux and Nice in France, in this overview you can talk about how the broader region ("south of France") fits with their preferences",
//     "places_to_stay": "Specific accommodation suggestions that match user's budget and preferences. For example, if there is a particular resort that gets great reviews and falls within the user's budget, recommend that and note where the resort is. If the user has noted that they want to stay in a remote place, and for example, you find that AirBnb accommodations are popular, recommend that they check out home rentals and note specific locations that would be best based on their preferences. Provide the responses in this format:
//         [
//               {
//                 "name": "accommodation name. If it's not a specific hotel (ex. Airbnb), it's ok to be a bit more general (for example: 'AirBnb homes on the waterfront')",
//                 "type": "hotel/airbnb/resort/etc",
//                 "location": "specific area/neighborhood",
//                 "why_recommended": "brief explanation matching user preferences",
//                 "price_range": "estimated nightly rate range"
//               },
//              // If you have additional recommendations, keep this format.
//        ]
// ",
//     "things_to_do": [
//       {
//         "destination_name": "Attraction/activity name. These recommendations should be specific places, destinations, or things to do that fit with the user's preferences. For instance, if the user has specified wanting to see cultural experiences, make sure that you are focusing on things like historical sites, cultural events (e.g. Mardis Gras). Don't just focus on the most popular destinations or things to do, but reference reviews on the internet and recommendations that would be a best fit to the user's preferences.",
//         "description": "2-3 sentence description of this activity and why it fits user preferences",
//       },
//       // Include 5-7 more activity objects following this format (6-8 in total)
//     ],
//     "restaurants": "Provide restaurant or dining recommendations based on the user's preferences and some of the best restaurants (by ratings, popularity) in the user's destination" [
//             {
//               "restaurant_name": "name of restaurant",
//               "restaurant_type": "type of cuisine: italian, american, french, etc.",
//               "description": "overview of the restaurant and why it is potentially a good fit for the user, based on their preferences."
//             },
//             // Include at least 2 more restaurants or dining options in this format
//     ],
//     "time_to_go": "Best months/seasons to visit based on user preferences",
//     "length_of_stay": "Note the length of stay, based on the user input",
//     "estimated_cost": "Cost range (e.g., '$5,000 - $7,000 USD') with brief explanation. For instance, if the user is coming from Chicago and has to fly to Florence (if this is the recommended destination), you can look at average ticket prices. If specific current prices aren't available, use representative ranges with appropriate caveats.",
//     "helpful_tips": "Key insights for travel to this destination (language, currency, local customs to keep in mind, etc.). If the recommended trip is in the same country that the user is from, do not mention currency or language and stick to other tips like "don't forget comfortable shoes as it's very walkable," or something similar",
//     "itinerary": "Create a detailed day-by-day itinerary that includes:
//           - Specific timing suggestions (morning/afternoon/evening)
//           - Named restaurants, attractions, and activities from your 'things_to_do' recommendations
//           - Logical geographic flow to minimize travel time
//           - Specific restaurant recommendations from some of the best restaurants in the destination area
//           - Transportation suggestions between activities when relevant
//           - Alternative options for weather-dependent activities
//           - Realistic pacing with appropriate time allocations
//           - ensure restaurant recommendations align with any dietary preferences mentioned
//           - Detailed "plan" that is a minimum of 100-150 words
//   Ensure the text is in the following format: [
//     {
//           "day_num": "day number (for example, 1 for the first day)",
//           "summary": "Provide a brief summary of the day's destinations",
//           "morning": "Detailed recommendations for activities and dining",
//           "afternoon": "Detailed recommendations for activities and dining",
//           "evening": "Detailed recommendations for activities and dining",
//    },
//          // Include additional days in this format
//     ]",
//   },
//   "second_destination": {
//     // Leave this as a blank object
//   }
// }

// IMPORTANT: For the itinerary, be highly specific. Instead of 'visit museums in the morning,' say 'Morning: Visit the Metropolitan Museum of Art (allow 3 hours), focusing on the Egyptian wing which matches your interest in ancient cultures.' Always include specific restaurant names, exact attraction names, and realistic timing.

// JSON FORMATTING REQUIREMENTS:
// 1. All string values must be on a single line with no actual line breaks
// 2. Use "\\n" for necessary line breaks within text
// 3. Properly escape all quotes, backslashes and special characters in string values
// 4. Ensure all array and object structures are valid JSON
// 5. Do not include any markdown, backticks, or text outside the JSON object`,
//           },
//         ],
//       },
//     ];

//     const system =
//       "Imagine that you are a travel agent, but with all of the information from the internet at your disposal. You are helping users find a vacation destination that best fits their preferences based on information that they give you. You should respond with a sense of humor, and enthusiasm for the trip that they are planning. ";

//     // Call anthropic API function to hit the API and return a response
//     const response = await callAnthropicAPI(messages, system);

//     console.log(response);
//     const parsedResponse = JSON.parse(response);

//     // const cleanedResponse = response.replace(/\\'/g, "'");

//     //const finalResponse = JSON.parse(response);

//     res.json(parsedResponse);
//   } catch (error) {
//     console.error("Error returning data:", error);
//     res.status(500).json({
//       error: "Failed to retrieve a response",
//       response: error.response,
//     });
//   }
// });
