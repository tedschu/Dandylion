import { PlanKnown } from "../types/types";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { div, text } from "motion/react-client";
import { CircularProgress } from "@mui/material";

function EditPlan() {
  const storedToken = localStorage.getItem("token");

  const { userInfo, setUserInfo, isLoggedIn, setIsLoggedIn, token, setToken } =
    useAuth();
  const {
    plan,
    setPlan,
    isEditModalOpen,
    setIsEditModalOpen,
    shouldRefreshPlans,
    setShouldRefreshPlans,
    revisedPlan,
    setRevisedPlan,
  } = useAppContext();

  const [isAnthropicLoading, setIsAnthropicLoading] = useState(false);

  const navigate = useNavigate();

  const setFormValues = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    setRevisedPlan((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleClick = () => {
    // Will need to call Anthropic API and then use a conditional to PATCH the data based on the plan type
    console.log("click!");
    setIsAnthropicLoading(true);

    getRevisedPlanData();
  };

  const getRevisedPlanData = async () => {
    try {
      const response = await fetch(
        "/api/anthropicAPI/user-revised-recommendation",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify({
            plan_data: revisedPlan?.plan_data,
            user_feedback: revisedPlan?.user_feedback,
          }),
        }
      );

      const textData = await response.json();

      console.log("Here is text response from Anthropic: ", textData);

      // ****  todo: update the below conditional - taken from resultsdestination component
      // When data comes back from Anthropic: update DB, update Plan state, set isAnthropicLoading to false, set isEditModalOpen to false (close modal)

      let updatedResult;

      if (textData) {
        // Pass plan_data and plan_id to functions, which call routes, returning the updated plan data to store in Plan state

        if (revisedPlan?.plan_key === "second_destination") {
          updatedResult = await updateSecondDestination(
            textData,
            revisedPlan.plan_id
          );
        } else {
          console.log(
            "hitting updateDestination with:",
            textData,
            revisedPlan?.plan_id
          );
          updatedResult = await updateDestination(
            textData,
            revisedPlan?.plan_id
          );
        }
      } else {
        setIsAnthropicLoading(false);
        throw new Error("Error generating revised plan_data from Anthropic");
      }

      if (updatedResult) {
        // Update state values
        setPlan(updatedResult);
        setIsAnthropicLoading(false);
        setIsEditModalOpen(false);
      }
    } catch (error) {
      console.error("error processing API response:", error);
    }
  };

  // TODO: ENSURE THERE'S A COUNTER VARIABLE INCREMENTING WHEN A PLAN IS REVISED (REVISIONS++)
  // WHEN A PLAN HAS >= 1 REVISIONS, GRAY OUT THE EDIT BUTTON AND DON'T ALLOW CLICKS
  // ALSO ADD IN FUNCTION TO CALL ANTHROPIC MULTIPLE TIMES IF SYSTEM IS OVERLOADED

  const updateDestination = async (plan_data, plan_id) => {
    console.log("updateDestination called with:", { plan_data, plan_id });
    console.log("plan_id typeof: ", typeof plan_data);

    try {
      const response = await fetch("/api/users/plan-update-destination", {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          destination: plan_data,
          plan_id: Number(plan_id),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log("Here is the response from updateDestination: ", data);

      return data;
    } catch (error) {
      console.error("Error updating database for destination: ", error);
    }
  };

  const updateSecondDestination = async (plan_data, plan_id) => {
    try {
      const response = await fetch(
        "/api/users/plan-update-second-destination",
        {
          method: "PATCH",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
          body: JSON.stringify({
            second_destination: plan_data,
            plan_id: Number(plan_id),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      console.log("Here is the response from updateDestination: ", data);

      return data;
    } catch (error) {
      console.error("Error updating database for destination: ", error);
    }
  };

  console.log(revisedPlan);

  return (
    <>
      <div className="editModalOverlay">
        <div className="editModalContentContainer">
          <div
            className="close"
            onClick={() => setIsEditModalOpen(false)}
            style={{
              position: "absolute",
              top: "6px",
              left: "10px",
              cursor: "pointer",
              fontSize: "18px",
            }}
          >
            x
          </div>
          <div className="editModalText">
            <h2>Revise your plan for {revisedPlan?.plan_data.location}</h2>
            <p>
              Describe what else you'd like to see in your travel plan in a
              sentence or two.
            </p>
            <div className="editModalTextDetails">
              <p style={{ fontWeight: "bold" }}>
                A few things to keep in mind:
              </p>
              <li>
                You can't change your destination (ex. "I don't want to go to
                New Orleans anymore"). To do that,{" "}
                <span
                  style={{ textDecoration: "underline" }}
                  onClick={() => navigate("/path")}
                >
                  create a new plan
                </span>
                .
              </li>
              <li>
                Dandylion (for the moment) doesn't plan for specific events (ex.
                "Find me the concert at the Auditorium on June 13th."). If this
                is a feature you'd like to see, let us know:
                feedback@dandylion.ai.
              </li>
            </div>
          </div>
          <form className="editPlanForm" action="">
            <textarea
              autoFocus
              placeholder="For example: 'add a few more Italian restaurants to the trip' or 'give me different hotel options'..."
              rows={4}
              value={revisedPlan?.user_feedback}
              name="user_feedback"
              onChange={setFormValues}
              style={{
                width: "100%",
                borderRadius: "6px",
                padding: "5px",
                border: "1px solid var(--action-coral)",
              }}
            />
            {!isAnthropicLoading && (
              <div className="buttonContainer">
                <button
                  type="button"
                  className="next"
                  onClick={() => handleClick()}
                >
                  Revise plan
                </button>
              </div>
            )}
          </form>
          {isAnthropicLoading && (
            <div style={{ margin: "15px 0" }}>
              <CircularProgress />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default EditPlan;
