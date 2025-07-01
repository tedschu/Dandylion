import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  const {
    userResponses,
    planId,
    questionPromptsUnknown,
    firstDestination,
    firstName,
  } = req.body;
  const storedToken = req.headers.authorization;
  console.log("Here is req.body:", req.body);
  console.log("Here is userResponses:", req.body.userResponses);
  console.log("Here is firstDestination deconstructed:", firstDestination);
  console.log("Here is storedToken: ", storedToken);
  console.log("Here is planId", planId, "...and typeof:", typeof planId);

  // status: first_destination has been called, returned, and stored in DB
  // todo:
  // call second_destination, passing firstDestination value
  // on return store to DB in existing (empty) object
  // call for first_image from GPT API
  // on return, pass to S3 to store, on return, store S3 URL in DB
  // call for second_image from GPT API
  // on return, pass to S3 to store, on return, store S3 URL in DB

  const getSecondTripResults = async () => {
    try {
      const secondDestinationResponse = await fetch(
        `${process.env.BASE_URL}/api/anthropicAPI/recommendation-unknown-second`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            question1: questionPromptsUnknown?.question1,
            response1: userResponses.response1,
            question2: questionPromptsUnknown?.question2,
            response2: userResponses.response2,
            question3: questionPromptsUnknown?.question3,
            response3: userResponses.response3,
            question4: questionPromptsUnknown?.question4,
            response4: userResponses.response4,
            question5: questionPromptsUnknown?.question5,
            response5: userResponses.response5,
            question6: questionPromptsUnknown?.question6,
            response6: userResponses.response6,
            question7: questionPromptsUnknown?.question7,
            response7: userResponses.response7,
            question8: questionPromptsUnknown?.question8,
            response8: userResponses.response8,
            question9: questionPromptsUnknown?.question9,
            response9: userResponses.response9,
            question10: questionPromptsUnknown?.question10,
            response10: userResponses.response10,
            firstName: firstName,
            firstDestination: firstDestination,
          }),
        }
      );

      console.log("Here's the Anthropic response: ", secondDestinationResponse);

      if (!secondDestinationResponse.ok) {
        const textResponse = await secondDestinationResponse.text();
        console.error("server response:", textResponse);

        // Retries the Anthropic API every 3 seconds (for 3 tries) if there's a
        // 529 error, meaning the API is currently overloaded
        if (
          secondDestinationResponse.status == 529 ||
          secondDestinationResponse.status == 500
        ) {
          console.log("Error: Anthropic API is overloaded");
          setTimeout(retryAnthropicAPIOnError, 5000);
          return;
        }
      }
      const textData = await secondDestinationResponse.json();
      console.log("Here is textData from Anthropic call: ", textData);

      // TODO: call postPlanAndFormData() to patch to DB
      await postPlan(textData, storedToken, planId);

      // Calls OpenAI API, passing location and overview info from Anthropic response, and user's first name
      // Returns a postcard-style image for the location
      console.log(
        "HEre is data being sent to GPT...location:",
        textData.location,
        "..and overview:",
        textData.overview
      );

      const images = await fetch(
        `${process.env.BASE_URL}/api/gptAPI/image_second`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            location: textData.location,
            overview: textData.overview,
          }),
        }
      );

      console.log("Here is images (raw response):", images);

      const imgData = await images.json();

      // TODO: Call function to upload to S3, returning image key to store into DB

      //console.log("HEre is imgData:", imgData);
    } catch (error) {
      // catch for getSecondTripResults()
      console.error(error);
    }
  };

  // Route handler to call getSecondTripResults()
  try {
    res.json({
      status:
        "Processing started for remaining API calls...calling getSecondTripResults()",
    });

    getSecondTripResults();
  } catch (error) {
    console.error("Error in processing background API calls: ", error);
  }
});

// Counter for Anthropic API call retries (see retryAPIOnError())
let apiRetries = 0;

// Calls Anthropic API up to 3 times via getTripResults() if there is a 529 error
// from Anthropic response.
const retryAnthropicAPIOnError = () => {
  let maxRetries = 3;

  console.log("Anthropic API error...retrying...");

  if (apiRetriesRef.current < maxRetries) {
    getSecondTripResults();
    apiRetries += 1;
  }
};

const postPlan = async (textData, storedToken, planId) => {
  try {
    console.log("here is storedToken:", storedToken);
    console.log("here is planId:", planId);
    const response = await fetch(
      `${process.env.BASE_URL}/api/users/plan-update-second-destination`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: storedToken,
        },
        body: JSON.stringify({
          second_destination: textData,
          plan_id: planId,
        }),
      }
    );

    console.log("DEBUG - response status:", response.status); // ← Add this

    const data = await response.json();

    console.log("Here is data from the postPlan response", data);
  } catch (error) {
    console.error("Error posting the plan data:", error);
  }
};

export default router;
