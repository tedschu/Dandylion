import express from "express";
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
      temperature: 0.7,
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

// ORIGINAL API CALL, BEFORE IT WAS SPLIT INTO TWO (FIRST DESTINATION CLIENT-SIDE, SECOND DESTINATION SERVER-SIDE)
// ******** DELETE WHEN SEPARATE CALLS ARE COMPLETED AND TESTED *******
//
// "Unknown" path (e.g. user needs a destination and itinerary / suggestions) call to get recommendations
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
            text: `Using the object below, review the questions and then the user's responses to those questions. You will then be returning recommendations on vacation destination that you think would be the best fit for them based on their responses in the format specified below ("destination"), as well as one additional recommendation in the same format ("second_destination"), for their reference. Only return the JSON object requested below, nothing else. Do not ask for confirmation - provide the complete JSON response immediately.

Make sure that your recommendations follow the parameters of the user's responses. For example, if they say they want to go to a beach destination during the fall, avoid recommending destinations where the fall is the primary hurricane season. For example, if they note that their budget is $5,000, don't recommend a vacation that will cost more than that.

Write your response as if you were speaking to them (ex. "You will love this area..."), using their first name: ${firstName}.

Here is the user object with the questions and responses:

${responseString}

Return ONLY a valid, properly escaped JSON object with the following structure:

{
  "destination": {
    "location": "Recommended destination (can be specific town or multiple destinations). Make sure that your recommendation is not the town that they live in (for example, if the user said they live in Minneapolis, do not recommend a trip to Minneapolis)",
    "overview": "3-4 sentences explaining why this recommendation fits user preferences. In this overview, you can also expand on the destinations that you're recommending, if appropriate. So for example, if you recommend Bordeaux and Nice in France, in this overview you can talk about how the broader region ("south of France") fits with their preferences",
    "places_to_stay": "Specific accommodation suggestions that match user's budget and preferences. For example, if there is a particular resort that gets great reviews and falls within the user's budget, recommend that and note where the resort is. If the user has noted that they want to stay in a remote place, and for example, you find that AirBnb accommodations are popular, recommend that they check out home rentals and note specific locations that would be best based on their preferences. Provide the responses in this format:
        [
              {
                "name": "accommodation name. If it's not a specific hotel (ex. Airbnb), it's ok to be a bit more general (for example: 'AirBnb homes on the waterfront')",
                "type": "hotel/airbnb/resort/etc",
                "location": "specific area/neighborhood",
                "why_recommended": "brief explanation matching user preferences",
                "price_range": "estimated nightly rate range"
              },
             // If you have additional recommendations, keep this format.
       ]
",
    "things_to_do": [
      {
        "destination_name": "Attraction/activity name. These recommendations should be specific places, destinations, or things to do that fit with the user's preferences. For instance, if the user has specified wanting to see cultural experiences, make sure that you are focusing on things like historical sites, cultural events (e.g. Mardis Gras). Don't just focus on the most popular destinations or things to do, but reference reviews on the internet and recommendations that would be a best fit to the user's preferences.",
        "description": "2-3 sentence description of this activity and why it fits user preferences",
      },
      // Include 5-7 more activity objects following this format (6-8 in total)
    ],
    "restaurants": "Provide restaurant or dining recommendations based on the user's preferences and some of the best restaurants (by ratings, popularity) in the user's destination" [
            {
              "restaurant_name": "name of restaurant",
              "restaurant_type": "type of cuisine: italian, american, french, etc.",
              "description": "overview of the restaurant and why it is potentially a good fit for the user, based on their preferences."
            },
            // Include at least 2 more restaurants or dining options in this format
    ],
    "time_to_go": "Best months/seasons to visit based on user preferences",
    "length_of_stay": "Note the length of stay, based on the user input",
    "estimated_cost": "Cost range (e.g., '$5,000 - $7,000 USD') with brief explanation. For instance, if the user is coming from Chicago and has to fly to Florence (if this is the recommended destination), you can look at average ticket prices. If specific current prices aren't available, use representative ranges with appropriate caveats.",
    "helpful_tips": "Key insights for travel to this destination (language, currency, local customs to keep in mind, etc.). If the recommended trip is in the same country that the user is from, do not mention currency or language and stick to other tips like "don't forget comfortable shoes as it's very walkable," or something similar",
    "itinerary": "Create a detailed day-by-day itinerary that includes:
          - Specific timing suggestions (morning/afternoon/evening)
          - Named restaurants, attractions, and activities from your 'things_to_do' recommendations
          - Logical geographic flow to minimize travel time
          - Specific restaurant recommendations from some of the best restaurants in the destination area
          - Transportation suggestions between activities when relevant
          - Alternative options for weather-dependent activities
          - Realistic pacing with appropriate time allocations
          - ensure restaurant recommendations align with any dietary preferences mentioned
          - Detailed "plan" that is a minimum of 100-150 words
  Ensure the text is in the following format: [
    {
          "day_num": "day number (for example, 1 for the first day)",
          "summary": "Provide a brief summary of the day's destinations",
          "morning": "Detailed recommendations for activities and dining",
          "afternoon": "Detailed recommendations for activities and dining",
          "evening": "Detailed recommendations for activities and dining",
   },
         // Include additional days in this format
    ]",
  },
  "second_destination": {
    // Same structure as above for an alternative recommendation
  }
}

IMPORTANT: For the itinerary, be highly specific. Instead of 'visit museums in the morning,' say 'Morning: Visit the Metropolitan Museum of Art (allow 3 hours), focusing on the Egyptian wing which matches your interest in ancient cultures.' Always include specific restaurant names, exact attraction names, and realistic timing.

JSON FORMATTING REQUIREMENTS:
1. All string values must be on a single line with no actual line breaks
2. Use "\\n" for necessary line breaks within text
3. Properly escape all quotes, backslashes and special characters in string values
4. Ensure all array and object structures are valid JSON
5. Do not include any markdown, backticks, or text outside the JSON object`,
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

Return ONLY a valid, properly escaped JSON object with the following structure:

{
  "destination": {
    "location": "Recommended destination (can be specific town or multiple destinations). Make sure that your recommendation is not the town that they live in (for example, if the user said they live in Minneapolis, do not recommend a trip to Minneapolis)",
    "overview": "3-4 sentences explaining why this recommendation fits user preferences. In this overview, you can also expand on the destinations that you're recommending, if appropriate. So for example, if you recommend Bordeaux and Nice in France, in this overview you can talk about how the broader region ("south of France") fits with their preferences",
    "places_to_stay": "Specific accommodation suggestions that match user's budget and preferences. For example, if there is a particular resort that gets great reviews and falls within the user's budget, recommend that and note where the resort is. If the user has noted that they want to stay in a remote place, and for example, you find that AirBnb accommodations are popular, recommend that they check out home rentals and note specific locations that would be best based on their preferences. Provide the responses in this format:
        [
              {
                "name": "accommodation name. If it's not a specific hotel (ex. Airbnb), it's ok to be a bit more general (for example: 'AirBnb homes on the waterfront')",
                "type": "hotel/airbnb/resort/etc",
                "location": "specific area/neighborhood",
                "why_recommended": "brief explanation matching user preferences",
                "price_range": "estimated nightly rate range"
              },
             // If you have additional recommendations, keep this format.
       ]
",
    "things_to_do": [
      {
        "destination_name": "Attraction/activity name. These recommendations should be specific places, destinations, or things to do that fit with the user's preferences. For instance, if the user has specified wanting to see cultural experiences, make sure that you are focusing on things like historical sites, cultural events (e.g. Mardis Gras). Don't just focus on the most popular destinations or things to do, but reference reviews on the internet and recommendations that would be a best fit to the user's preferences.",
        "description": "2-3 sentence description of this activity and why it fits user preferences",
      },
      // Include 5-7 more activity objects following this format (6-8 in total)
    ],
    "restaurants": "Provide restaurant or dining recommendations based on the user's preferences and some of the best restaurants (by ratings, popularity) in the user's destination" [
            {
              "restaurant_name": "name of restaurant",
              "restaurant_type": "type of cuisine: italian, american, french, etc.",
              "description": "overview of the restaurant and why it is potentially a good fit for the user, based on their preferences."
            },
            // Include at least 2 more restaurants or dining options in this format
    ],
    "time_to_go": "Best months/seasons to visit based on user preferences",
    "length_of_stay": "Note the length of stay, based on the user input",
    "estimated_cost": "Cost range (e.g., '$5,000 - $7,000 USD') with brief explanation. For instance, if the user is coming from Chicago and has to fly to Florence (if this is the recommended destination), you can look at average ticket prices. If specific current prices aren't available, use representative ranges with appropriate caveats.",
    "helpful_tips": "Key insights for travel to this destination (language, currency, local customs to keep in mind, etc.). If the recommended trip is in the same country that the user is from, do not mention currency or language and stick to other tips like "don't forget comfortable shoes as it's very walkable," or something similar",
    "itinerary": "Create a detailed day-by-day itinerary that includes:
          - Specific timing suggestions (morning/afternoon/evening)
          - Named restaurants, attractions, and activities from your 'things_to_do' recommendations
          - Logical geographic flow to minimize travel time
          - Specific restaurant recommendations from some of the best restaurants in the destination area
          - Transportation suggestions between activities when relevant
          - Alternative options for weather-dependent activities
          - Realistic pacing with appropriate time allocations
          - ensure restaurant recommendations align with any dietary preferences mentioned
          - Detailed "plan" that is a minimum of 100-150 words
  Ensure the text is in the following format: [
    {
          "day_num": "day number (for example, 1 for the first day)",
          "summary": "Provide a brief summary of the day's destinations",
          "morning": "Detailed recommendations for activities and dining",
          "afternoon": "Detailed recommendations for activities and dining",
          "evening": "Detailed recommendations for activities and dining",
   },
         // Include additional days in this format
    ]",
  },
  "second_destination": {
    // Leave this as a blank object
  }
}

IMPORTANT: For the itinerary, be highly specific. Instead of 'visit museums in the morning,' say 'Morning: Visit the Metropolitan Museum of Art (allow 3 hours), focusing on the Egyptian wing which matches your interest in ancient cultures.' Always include specific restaurant names, exact attraction names, and realistic timing.

JSON FORMATTING REQUIREMENTS:
1. All string values must be on a single line with no actual line breaks
2. Use "\\n" for necessary line breaks within text
3. Properly escape all quotes, backslashes and special characters in string values
4. Ensure all array and object structures are valid JSON
5. Do not include any markdown, backticks, or text outside the JSON object`,
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
            text: `Using the object below, review the questions and then the user's responses to those questions. You will then be returning recommendations on a vacation destination that you think would be the best fit for them based on their responses in the format specified below ("destination"). Only return the JSON object requested below, nothing else. Do not ask for confirmation - provide the complete JSON response immediately.

            This destination recommendation needs to be distinct from another destination (${firstDestination}), as it will be presented as an alternative destination. 

            Make sure that your recommendations follow the parameters of the user's responses. For example, if they say they want to go to a beach destination during the fall, avoid recommending destinations where the fall is the primary hurricane season. For example, if they note that their budget is $5,000, don't recommend a vacation that will cost more than that.

Write your response as if you were speaking to them (ex. "You will love this area..."), using their first name: ${firstName}.

Here is the user object with the questions and responses:

${responseString}

Return ONLY a valid, properly escaped JSON object with the following structure:

  {
    "location": "Recommended destination (can be specific town or multiple destinations). Make sure that your recommendation is not the town that they live in (for example, if the user said they live in Minneapolis, do not recommend a trip to Minneapolis)",
    "overview": "3-4 sentences explaining why this recommendation fits user preferences. In this overview, you can also expand on the destinations that you're recommending, if appropriate. So for example, if you recommend Bordeaux and Nice in France, in this overview you can talk about how the broader region ("south of France") fits with their preferences",
    "places_to_stay": "Specific accommodation suggestions that match user's budget and preferences. For example, if there is a particular resort that gets great reviews and falls within the user's budget, recommend that and note where the resort is. If the user has noted that they want to stay in a remote place, and for example, you find that AirBnb accommodations are popular, recommend that they check out home rentals and note specific locations that would be best based on their preferences. Provide the responses in this format:
        [
          {
            "name": "accommodation name. If it's not a specific hotel (ex. Airbnb), it's ok to be a bit more general (for example: 'AirBnb homes on the waterfront')",
            "type": "hotel/airbnb/resort/etc",
            "location": "specific area/neighborhood",
            "why_recommended": "brief explanation matching user preferences",
            "price_range": "estimated nightly rate range",
          },
          // If you have additional recommendations, keep this format.
       ],
    "things_to_do": 
      [
        {
          "destination_name": "Attraction/activity name. These recommendations should be specific places, destinations, or things to do that fit with the user's preferences. For instance, if the user has specified wanting to see cultural experiences, make sure that you are focusing on things like historical sites, cultural events (e.g. Mardis Gras). Don't just focus on the most popular destinations or things to do, but reference reviews on the internet and recommendations that would be a best fit to the user's preferences.",
          "description": "2-3 sentence description of this activity and why it fits user preferences",
        },
      // Include 5-7 more activity objects following this format (6-8 in total)
      ],
    "restaurants": "Provide restaurant or dining recommendations based on the user's preferences and some of the best restaurants (by ratings, popularity) in the user's destination" 
      [
        {
          "restaurant_name": "name of restaurant",
          "restaurant_type": "type of cuisine: italian, american, french, etc.",
          "description": "overview of the restaurant and why it is potentially a good fit for the user, based on their preferences."
        },
        // Include at least 2 more restaurants or dining options in this format
      ],
    "time_to_go": "Best months/seasons to visit based on user preferences",
    "length_of_stay": "Note the length of stay, based on the user input",
    "estimated_cost": "Cost range (e.g., '$5,000 - $7,000 USD') with brief explanation. For instance, if the user is coming from Chicago and has to fly to Florence (if this is the recommended destination), you can look at average ticket prices. If specific current prices aren't available, use representative ranges with appropriate caveats.",
    "helpful_tips": "Key insights for travel to this destination (language, currency, local customs to keep in mind, etc.). If the recommended trip is in the same country that the user is from, do not mention currency or language and stick to other tips like "don't forget comfortable shoes as it's very walkable," or something similar",
    "itinerary": "Create a detailed day-by-day itinerary that includes:
          - Specific timing suggestions (morning/afternoon/evening)
          - Named restaurants, attractions, and activities from your 'things_to_do' recommendations
          - Logical geographic flow to minimize travel time
          - Specific restaurant recommendations from some of the best restaurants in the destination area
          - Transportation suggestions between activities when relevant
          - Alternative options for weather-dependent activities
          - Realistic pacing with appropriate time allocations
          - ensure restaurant recommendations align with any dietary preferences mentioned
          - Detailed "plan" that is a minimum of 100-150 words"
      [
        {
          "day_num": "day number (for example, 1 for the first day)",
          "summary": "Provide a brief summary of the day's destinations",
          "morning": "Detailed recommendations for activities and dining",
          "afternoon": "Detailed recommendations for activities and dining",
          "evening": "Detailed recommendations for activities and dining",
        },
         // Include additional days in this format
      ],
  }

IMPORTANT: For the itinerary, be highly specific. Instead of 'visit museums in the morning,' say 'Morning: Visit the Metropolitan Museum of Art (allow 3 hours), focusing on the Egyptian wing which matches your interest in ancient cultures.' Always include specific restaurant names, exact attraction names, and realistic timing.

JSON FORMATTING REQUIREMENTS:
1. All string values must be on a single line with no actual line breaks
2. Use "\\n" for necessary line breaks within text
3. Properly escape all quotes, backslashes and special characters in string values
4. Ensure all array and object structures are valid JSON
5. Do not include any markdown, backticks, or text outside the JSON object`,
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

//  **********   TODO: RESPONSE REFINEMENT ROUTE. HERE'S THE PROMPT FROM ANTHROPIC CONSOLE (TESTED):  ***********

// Update the JSON object of travel recommendations below by incorporating the "user_feedback" into the suggestions. Only modify the elements of the text in the object that are relevant to the user_feedback. For instance, if there was a "destination_name" field recommending a hike to the top of a mountain, and the "user_feedback" notes that one of the travelers is afraid of heights, just update and modify that particular element in the object. Leave the rest the same.

// Write your response as if you were speaking to them (ex. "You will love this area..."), using their first name: ${firstName}.

// Here is the "user_feedback":

// "I really want to go on a boat ride too"

// Return ONLY the valid, properly escaped JSON object below, incorporating any modifications, with the following structure:

// {
//   "destination": {
//     "location": "Montreal, Quebec, Canada",
//     "overview": "Cary, you'll love the charming city of Montreal for a fall weekend getaway with your partner and baby. This vibrant Canadian metropolis offers a perfect blend of European flair, stunning architecture, delicious cuisine, and family-friendly activities. With its walkable neighborhoods, beautiful parks, and rich history, Montreal provides a delightful mix of relaxation and adventure that aligns with your preferences.",
//     "places_to_stay": [
//       {
//         "place_to_stay": "Le Square Phillips Hôtel & Suites: This centrally located hotel offers spacious suites with kitchenettes, ideal for families with young children. It's within walking distance of many attractions and has an indoor pool."
//       },
//       {
//         "place_to_stay": "Loews Hôtel Vogue: This upscale hotel in downtown Montreal features comfortable rooms, a fitness center, and an on-site restaurant. They offer family-friendly amenities and are close to shopping and dining options."
//       }
//     ],
//     "things_to_do": [
//       {
//         "destination_name": "Old Montreal Walking Tour",
//         "description": "Explore the charming cobblestone streets and historic buildings of Old Montreal on a guided walking tour. Learn about the city's rich history and architecture while strolling through this picturesque neighborhood with your family."
//       },
//       {
//         "destination_name": "Montreal Botanical Garden",
//         "description": "Visit the stunning Montreal Botanical Garden, which features diverse plant collections, themed gardens, and greenhouses. Enjoy a relaxing walk through the gardens and take in the beautiful fall foliage."
//       },
//       {
//         "destination_name": "Notre-Dame Basilica",
//         "description": "Marvel at the stunning architecture and intricate interior of the Notre-Dame Basilica, one of Montreal's most iconic landmarks. This historic church is a must-see for its beautiful stained glass windows and serene atmosphere."
//       },
//       {
//         "destination_name": "Mount Royal Park",
//         "description": "Take a leisurely stroll or enjoy a picnic in Mount Royal Park, a vast green space in the heart of the city. The park offers scenic views of Montreal, walking trails, and plenty of space for your little one to explore."
//       },
//       {
//         "destination_name": "Jean-Talon Market",
//         "description": "Experience the vibrant atmosphere of Jean-Talon Market, one of North America's largest open-air markets. Browse the stalls filled with fresh produce, artisanal goods, and local specialties, and grab a bite to eat from one of the many food vendors."
//       },
//       {
//         "destination_name": "Montreal Museum of Fine Arts",
//         "description": "Discover an extensive collection of art from around the world at the Montreal Museum of Fine Arts. The museum offers family-friendly programs and interactive exhibits that will engage both you and your little one."
//       }
//     ],
//     "time_to_go": "September to November",
//     "length_of_stay": "Weekend trip (2-3 nights)",
//     "estimated_cost": "$1,500 - $2,000 USD. This estimate includes airfare from Minneapolis (around $400-$600 per person), accommodations at a mid-range hotel (approximately $150-$250 per night), meals, and activities. Prices may vary depending on specific travel dates and booking in advance can help secure better rates.",
//     "helpful_tips": "While many Montrealers speak English, learning a few basic French phrases can be helpful and appreciated. The Canadian dollar is the official currency, so be sure to exchange money or use credit cards that don't charge foreign transaction fees. Montreal has a reliable public transportation system, including buses and the metro, which can be a convenient way to explore the city with a baby in tow.",
//     "itinerary": [
//       {
//         "day1": "Arrive in Montreal and check into your hotel. Spend the afternoon exploring Old Montreal on a guided walking tour. Visit the Notre-Dame Basilica and take a stroll along the charming cobblestone streets. Enjoy dinner at a family-friendly restaurant in the area, such as Modavie or Jardin Nelson."
//       },
//       {
//         "day2": "Start your day with a visit to the Montreal Botanical Garden. Explore the various themed gardens and enjoy the beautiful fall foliage. In the afternoon, head to Mount Royal Park for a leisurely walk or picnic. Take in the scenic views of the city and let your little one enjoy some playtime in the park. For dinner, try a local favorite like Schwartz's Deli for their famous smoked meat sandwiches or St-Viateur Bagel for handmade Montreal-style bagels."
//       },
//       {
//         "day3": "Begin your day at the Jean-Talon Market, browsing the stalls and sampling local specialties. Grab lunch at one of the market's food vendors. In the afternoon, visit the Montreal Museum of Fine Arts and enjoy their family-friendly exhibits. If time allows, take a stroll along the lively Saint-Catherine Street for some shopping before heading back to the hotel to pack up and depart."
//       }
//     ]
//   },
//   "second_destination": {
//     "location": "Prince Edward County, Ontario, Canada",
//     "overview": "For a more laid-back and nature-oriented weekend getaway, consider visiting Prince Edward County in Ontario, Canada. This charming rural region is known for its stunning beaches, picturesque wineries, and quaint towns. With its mix of outdoor activities, culinary experiences, and relaxing atmosphere, Prince Edward County offers a perfect escape for you, your partner, and your baby.",
//     "places_to_stay": [
//       {
//         "place_to_stay": "The Waring House: This historic inn offers comfortable rooms and cottages, an on-site restaurant, and a playground for children. It's located near many of the county's attractions and wineries."
//       },
//       {
//         "place_to_stay": "Sandbanks Provincial Park Camping: If you're feeling adventurous, consider camping at Sandbanks Provincial Park. The park offers campsites, as well as rustic cabins and yurts, perfect for a family getaway in nature."
//       }
//     ],
//     "photos": [],
//     "things_to_do": [
//       {
//         "destination_name": "Sandbanks Provincial Park",
//         "description": "Spend a day at Sandbanks Provincial Park, known for its stunning sandy beaches and crystal-clear waters. Enjoy a picnic, take a leisurely walk along the shore, and let your little one play in the sand."
//       },
//       {
//         "destination_name": "Prince Edward County Wineries",
//         "description": "Explore some of the county's renowned wineries, such as Huff Estates or Closson Chase Vineyards. Many wineries offer tastings and have picturesque grounds where you can relax and take in the scenic views."
//       },
//       {
//         "destination_name": "Lake on the Mountain",
//         "description": "Visit the mysterious Lake on the Mountain, a natural wonder that sits high above the surrounding landscape. Take a short hike to the viewpoint and enjoy the breathtaking panoramic views of the county."
//       },
//       {
//         "destination_name": "Picton Main Street",
//         "description": "Stroll along Picton's charming Main Street, lined with boutiques, art galleries, and cafes. Browse the unique shops, grab a bite to eat, and soak in the quaint small-town atmosphere."
//       },
//       {
//         "destination_name": "Prince Edward County Lavender Farm",
//         "description": "Visit the picturesque Prince Edward County Lavender Farm and wander through the fragrant lavender fields. Learn about the farm's history and shop for lavender-infused products in their gift shop."
//       },
//       {
//         "destination_name": "Millennium Trail",
//         "description": "Rent bikes and explore the Millennium Trail, a 46-kilometer recreational trail that winds through the county's scenic landscapes. Stop at charming towns and villages along the way and enjoy the beautiful fall colors."
//       }
//     ],
//     "time_to_go": "September to October",
//     "length_of_stay": "Weekend trip (2-3 nights)",
//     "estimated_cost": "$1,000 - $1,500 USD. This estimate includes airfare from Minneapolis to Toronto (around $300-$500 per person), accommodations at a mid-range hotel or inn (approximately $100-$200 per night), rental car, meals, and activities. Prices may vary depending on specific travel dates and booking in advance can help secure better rates.",
//     "helpful_tips": "Prince Edward County is a rural area, so having a rental car is recommended to easily explore the various attractions and towns. Many wineries and restaurants in the area feature local produce and artisanal products, so be sure to sample the region's flavors. Keep in mind that some attractions and businesses may have limited hours or be closed during the off-season, so it's always a good idea to check ahead.",
//     "itinerary": [
//       {
//         "day1": "Arrive in Prince Edward County and check into your accommodations. Spend the afternoon exploring Sandbanks Provincial Park. Enjoy a picnic on the beach, take a leisurely walk along the shore, and let your baby play in the sand. In the evening, have dinner at a local restaurant like the Drake Devonshire or the Agrarian Bistro, both known for their farm-to-table cuisine."
//       },
//       {
//         "day2": "Begin your day with a visit to the Prince Edward County Lavender Farm. Wander through the fragrant lavender fields and browse the gift shop for unique lavender-infused products. Next, head to Lake on the Mountain for a short hike and take in the stunning views of the county. In the afternoon, explore some of the county's renowned wineries, such as Huff Estates or Closson Chase Vineyards. Enjoy tastings and relax on the picturesque grounds. For dinner, try a local favorite like the County Canteen or the Acoustic Grill."
//       },
//       {
//         "day3": "Start your day with a stroll along Picton's charming Main Street. Browse the unique shops, art galleries, and cafes, and grab breakfast at a local spot like the Vic Cafe or the Lighthouse Restaurant. If time allows, rent bikes and explore a portion of the Millennium Trail before packing up and heading back home."
//       }
//     ]
//   }
// }

// JSON FORMATTING REQUIREMENTS:
// 1. All string values must be on a single line with no actual line breaks
// 2. Use "\\n" for necessary line breaks within text
// 3. Properly escape all quotes, backslashes and special characters in string values
// 4. Ensure all array and object structures are valid JSON
// 5. Do not include any markdown, backticks, or text outside the JSON object

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

Return ONLY a valid, properly escaped JSON object with the following structure:

{
  "destination": {
    "location": "Using the details provided in response1, return the destination (or destinations) they'll be going to. For example, if they noted they're traveling to San Francisco and Napa, return 'San Francisco and Napa'",
    "overview": "3-4 sentences reviewing the highlights of the trip, and why the recommendations match the user preferences. In this overview, you can also expand on the recommendations you provided, if appropriate. For example, if the user mentioned going to Portland but also asked for towns along the coast, you can mention the specifics and a few activities that would be highlights.",
    "places_to_stay": "Specific accommodation suggestions that match user's budget and preferences. If they already specified hotels that they have booked, return those responses. For example, if there is a particular resort that gets great reviews and falls within the user's budget, recommend that and note where the resort is. If the user has noted that they want to stay in a remote place, and for example, you find that AirBnb accommodations are popular, recommend that they check out home rentals and note specific locations that would be best based on their preferences. Provide the responses in this format: 
        [
              {
                "name": "accommodation name. If it's not a specific hotel (ex. Airbnb), it's ok to be a bit more general (for example: 'AirBnb homes on the waterfront')",
                "type": "hotel/airbnb/resort/etc",
                "location": "specific area/neighborhood", 
                "why_recommended": "brief explanation matching user preferences",
                "price_range": "estimated nightly rate range"
              },
             // If you have additional recommendations, keep this format.
       ]
",
    "things_to_do": [
      {
        "destination_name": "Attraction/activity name. These recommendations should be specific places, destinations, or things to do that fit with the user's preferences. For instance, if the user has specified wanting to see cultural experiences, make sure that you are focusing on things like historical sites, cultural events (e.g. Mardis Gras). Don't just focus on the most popular destinations or things to do, but reference reviews on the internet and recommendations that would be a best fit to the user's preferences.",
        "description": "2-3 sentence description of this activity and why it fits user preferences",
      },
      // Include 5-7 more activity objects following this format (6-8 in total)
    ],
    "restaurants": "Provide restaurant or dining recommendations based on the user's preferences and some of the best restaurants (by ratings, popularity) in the user's destination" [
            {
              "restaurant_name": "name of restaurant",
              "restaurant_type": "type of cuisine: italian, american, french, etc.",
              "description": "overview of the restaurant and why it is potentially a good fit for the user, based on their preferences."
            },
            // Include at least 4 more restaurants or dining options in this format
    ],
    "time_to_go": "Best months/seasons to visit based on user preferences. If the user already mentioned specific dates that they have booked, you can provide comments on the timing (for example, 'August is the best time to go to Hawaii - great choice!')",
    "length_of_stay": "Note the length of stay, based on the user input",
    "estimated_cost": "Cost range (e.g., '$5,000 - $7,000 USD') with brief explanation. For instance, if the user is coming from Chicago and has to fly to Florence, you can look at average ticket prices. Base cost estimates on typical ranges for the destination and season. If specific current prices aren't available, use representative ranges with appropriate caveats.",
    "helpful_tips": "Key insights for travel to this destination (language, currency, local customs to keep in mind, etc.). If the recommended trip is in the same country that the user is from, do not mention currency or language and stick to other tips like "don't forget comfortable shoes as it's very walkable," or something similar",    
    "itinerary": "Create a detailed day-by-day itinerary that includes:
          - Specific timing suggestions (morning/afternoon/evening)
          - Named restaurants, attractions, and activities from your 'things_to_do' recommendations
          - Logical geographic flow to minimize travel time
          - Specific restaurant recommendations from some of the best restaurants in the destination area
          - Transportation suggestions between activities when relevant
          - Alternative options for weather-dependent activities
          - Realistic pacing with appropriate time allocations
          - ensure restaurant recommendations align with any dietary preferences mentioned
          - Detailed "activities" plan that is a minimum of 150-200 words
  Ensure the text is in the following format: [
    {
     "day_num": 1,
     "summary": "Provide a brief summary of the day's destinations",
  "morning": {
    "time": "9:00 AM - 12:00 PM",
    "activities": "Start your day exploring Chinatown, beginning at the iconic Dragon Gate on Grant Avenue. Spend time browsing the traditional herb shops, tea stores, and souvenir markets along Grant Avenue and Stockton Street. Don't miss the beautiful murals in Portsmouth Square and the historic temples like Tin How Temple. The narrow alleyways like Waverly Place offer authentic glimpses of daily life. Allow 2-3 hours to properly explore this vibrant neighborhood, and consider timing your visit to catch the morning dim sum crowds for an authentic cultural experience.",
    "dining": "For breakfast, head to Golden Boy Pizza on Green Street for their famous focaccia squares - they offer excellent vegetarian options including their margherita and veggie combinations. The casual atmosphere and local favorite status make it perfect for starting your San Francisco adventure."
  },
    "afternoon": {
      "time": "12:00 PM - 5:00 PM", 
      "activities": "Detailed afternoon activities",
      "dining": "Lunch recommendations"
    },
    "evening": {
      "time": "5:00 PM - 9:00 PM",
      "activities": "Evening plans",
      "dining": "Dinner suggestions"
    }
  },
         // Include additional days in this format
    ]",
  },
}

IMPORTANT: For the itinerary, be highly specific. Instead of 'visit museums in the morning,' say 'Morning: Visit the Metropolitan Museum of Art (allow 3 hours), focusing on the Egyptian wing which matches your interest in ancient cultures.' Always include specific restaurant names, exact attraction names, and realistic timing.

JSON FORMATTING REQUIREMENTS:
1. All string values must be on a single line with no actual line breaks
2. Use "\\n" for necessary line breaks within text
3. Properly escape all quotes, backslashes and special characters in string values
4. Ensure all array and object structures are valid JSON
5. Do not include any markdown, backticks, or text outside the JSON object`,
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

export default router;

// 1. All string values must be on a single line with no actual line breaks
