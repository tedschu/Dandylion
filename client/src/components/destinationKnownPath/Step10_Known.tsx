import { body, text } from "motion/react-client";
import { apiResponse, StepProps } from "../../types/types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import pyramid from "../../assets/images/pyramids.png";

function Step10({
  currentStep,
  setCurrentStep,
  userResponses,
  setUserResponses,
  questionPromptsKnown,
  setQuestionPromptsKnown,
  apiResponse,
  setApiResponse,
  userInfo,
  setUserInfo,
}: StepProps) {
  const setFormValues = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const tempObj = { ...userResponses };
    tempObj[event.target.name as keyof typeof userResponses] =
      event.target.value;
    setUserResponses(tempObj);
  };

  const navigate = useNavigate();

  function handleSubmission() {
    getTripResults();
    navigate("/your-destination-plan");
  }

  // Gets trip recommendation for destination and second_destination, and image for first destination (second is in useEffect below, to save load time)
  const getTripResults = async () => {
    try {
      // Calls Anthropic API, passing questions and user responses (and user's first name)
      // Returns primary and secondary recommendation objects
      const response = await fetch("/api/anthropicAPI/recommendation", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          question1: questionPromptsKnown?.question1,
          response1: userResponses.response1,
          question2: questionPromptsKnown?.question2,
          response2: userResponses.response2,
          question3: questionPromptsKnown?.question3,
          response3: userResponses.response3,
          question4: questionPromptsKnown?.question4,
          response4: userResponses.response4,
          question5: questionPromptsKnown?.question5,
          response5: userResponses.response5,
          question6: questionPromptsKnown?.question6,
          response6: userResponses.response6,
          question7: questionPromptsKnown?.question7,
          response7: userResponses.response7,
          question8: questionPromptsKnown?.question8,
          response8: userResponses.response8,
          question9: questionPromptsKnown?.question9,
          response9: userResponses.response9,
          question10: questionPromptsKnown?.question10,
          response10: userResponses.response10,
          firstName: userInfo?.firstName,
        }),
      });

      if (!response.ok) {
        const textResponse = await response.text();
        console.error("server response:", textResponse);
        throw new Error("failed to get the recommendation");
      }

      const textData = await response.json();

      // Calls OpenAI API, passing location and overview info from Anthropic response, and user's first name
      // Returns a postcard-style image for the location
      const images = await fetch("/api/gptAPI/image", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          location: textData.destination.location,
          overview: textData.destination.overview,
        }),
      });

      console.log("Here is images (raw response):", images);

      const imgData = await images.json();

      console.log("HEre is imgData:", imgData);

      if (imgData) {
        const copy = { ...textData };
        if (copy.destination && copy.destination.photos) {
          copy.destination.photos.push("eventual_s3_URL");
        }
        if (setApiResponse) {
          setApiResponse(copy as apiResponse);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  // // useEffect to call OpenAI API for second_destination's image (will call after first image + content loads for user)
  // useEffect(() => {
  //   if (
  //     apiResponse?.second_destination?.photos?.length === 0 &&
  //     apiResponse?.destination?.photos?.length > 0
  //   ) {
  //     getSecondImage();
  //   }
  // }, [apiResponse?.destination?.photos]);

  // // Function to call OpenAI API to get second_Destination image
  // const getSecondImage = async () => {
  //   try {
  //     console.log("Getting the second image...");
  //     const images = await fetch("/api/gptAPI/image_second", {
  //       method: "POST",
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         location: apiResponse?.second_destination.location,
  //         overview: apiResponse?.second_destination.overview,
  //       }),
  //     });

  //     const imgData = await images.json();

  //     if (imgData) {
  //       const copy = { ...apiResponse };
  //       if (copy.second_destination && copy.second_destination.photos) {
  //         copy.second_destination.photos.push("eventual_s3_URL");
  //       }
  //       if (setApiResponse) {
  //         setApiResponse(copy as apiResponse);
  //       }
  //     }
  //   } catch (error) {}
  // };

  return (
    <>
      <div className="stepContainer">
        <div className="questionImageGridContainer">
          <img src={pyramid} alt="" />
          <h3>{questionPromptsKnown?.question10}</h3>
          <div></div>
        </div>{" "}
        <form className="userForm" action="">
          <textarea
            placeholder="My daughter is a vegetarian."
            rows={3}
            value={userResponses.response10}
            name="response10"
            onChange={setFormValues}
          />
          <div className="buttonContainer">
            <button className="back" onClick={() => setCurrentStep(9)}>
              Go back
            </button>
            <button className="next" onClick={handleSubmission}>
              Show me the results!
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Step10;
