import express from "express";
const router = express.Router();

// Counter for Anthropic API call retries
let apiRetries = 0;

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

    console.log("DEBUG - response status:", response.status);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Here is data from the postPlan response", data);
    return data;
  } catch (error) {
    console.error("Error posting the plan data:", error);
    throw error;
  }
};

router.post("/", async (req, res) => {
  const {
    userResponses,
    planId,
    userId,
    questionPromptsUnknown,
    firstDestination,
    firstName,
  } = req.body;
  const storedToken = req.headers.authorization;

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

      if (!secondDestinationResponse.ok) {
        const textResponse = await secondDestinationResponse.text();
        console.error("Anthropic API error response:", textResponse);
        console.log("Here is textResponse: ", textResponse);

        // Handle retry for overloaded API
        if (
          secondDestinationResponse.status === 529 ||
          secondDestinationResponse.status === 500
        ) {
          console.log("Error: Anthropic API is overloaded");

          // Implement retry logic properly
          if (apiRetries < 3) {
            apiRetries += 1;
            console.log(`Retrying... attempt ${apiRetries}/3`);

            // Wait 5 seconds then retry
            await new Promise((resolve) => setTimeout(resolve, 5000));
            return await getSecondTripResults(); // Recursive retry
          } else {
            apiRetries = 0; // Reset counter
            throw new Error(
              `Anthropic API failed after 3 retries. Status: ${secondDestinationResponse.status}`
            );
          }
        }

        throw new Error(
          `Anthropic API error: ${secondDestinationResponse.status} - ${textResponse}`
        );
      }

      const textData = await secondDestinationResponse.json();
      console.log("Here is textData from Anthropic call: ", textData);

      // Reset retry counter on success
      apiRetries = 0;

      await postPlan(textData, storedToken, planId);

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
            userId: userId,
            planId: planId,
          }),
        }
      );

      if (!images.ok) {
        throw new Error(`Image generation failed: ${images.status}`);
      }

      const imgData = await images.json();
      console.log("Here is imgData for second image:", imgData);

      if (imgData.success && imgData.imageUrl) {
        const postImage = await fetch(
          `${process.env.BASE_URL}/api/plans/update-second-image`,
          {
            method: "PUT",
            headers: {
              "Content-type": "application/json",
              Authorization: storedToken,
            },
            body: JSON.stringify({
              planId: planId,
              imageUrl: imgData.imageUrl,
            }),
          }
        );

        if (!postImage.ok) {
          throw new Error(`Failed to update image in DB: ${postImage.status}`);
        }

        const postImageData = await postImage.json();
        console.log(
          "Here is the data for image 2 from the put route:",
          postImageData
        );

        return postImageData;
      } else {
        throw new Error(
          "Image generation was not successful or no imageUrl returned"
        );
      }
    } catch (error) {
      console.error("Error in getSecondTripResults:", error);
      throw error;
    }
  };

  // Main execution
  try {
    await getSecondTripResults();

    res.json({
      status: "All API calls completed successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in processing background API calls: ", error);

    // Reset retry counter on final failure
    apiRetries = 0;

    res.status(500).json({
      error: "Failed to process remaining API calls",
      details: error.message,
    });
  }
});

export default router;
