import { PlanKnown } from "../types/types";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

function editPlan() {
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
                You can't change your destination here (ex. "I don't want to go
                to New Orleans anymore"). To do that,{" "}
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
              style={{ width: "100%", borderRadius: "6px", padding: "5px" }}
            />
            <div className="buttonContainer">
              <button
                type="button"
                className="next"
                // onClick={() => handleClick()}
              >
                Revise plan
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default editPlan;
