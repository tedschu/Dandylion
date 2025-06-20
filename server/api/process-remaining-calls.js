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
  console.log("Here is req.body:", req.body);
  console.log("Here is userResponses:", req.body.userResponses);
  console.log("Here is firstDestination deconstructed:", firstDestination);

  try {
    res.json({ status: "processing started for remaining calls..." });

    // status: first_destination has been called, returned, and stored in DB
    // todo:
    // call second_destination, passing firstDestination value
    // on return store to DB in existing (empty) object
    // call for first_image from GPT API
    // on return, pass to S3 to store, on return, store S3 URL in DB
    // call for second_image from GPT API
    // on return, pass to S3 to store, on return, store S3 URL in DB

    console.log("Calling Anthropic API for second_destination...");

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

    if (!response.ok) {
      const textResponse = await secondDestinationResponse.text();
      console.error("server response:", textResponse);

      // Retries the Anthropic API every 3 seconds (for 3 tries) if there's a
      // 529 error, meaning the API is currently overloaded
      if (
        secondDestinationResponse.status == 529 ||
        secondDestinationResponse.status == 500
      ) {
        console.log("Error: Anthropic API is overloaded");
        setTimeout(retryAnthropicAPIOnError, 4000);
        return;
      }
    }
  } catch (error) {}
});

// Calls Anthropic API up to 3 times via getTripResults() if there is a 529 error
// from Anthropic response.
const retryAnthropicAPIOnError = () => {
  let maxRetries = 3;

  console.log("Anthropic API error...retrying...");

  if (apiRetriesRef.current < maxRetries) {
    getTripResults();
    apiRetriesRef.current += 1;
  } else {
    setIsAnthropicLoading(false);
    setShowAPIErrorMessage(true);
  }
};

export default router;
