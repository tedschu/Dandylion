import { useNavigate, useParams } from "react-router-dom";
import { Plan, PlanKnown } from "../types/types";
import { useEffect, useState } from "react";
import Results_Full_Unknown from "../components/destinationUnknownPath/results/Results_Full_Unknown";
import Results_Full_Known from "../components/destinationKnownPath/results/Results_Full_Known";
import Header from "../components/Header";
import { useAppContext } from "../contexts/AppContext";

function PlanDetail() {
  const { plan_id } = useParams();
  const { plan, setPlan } = useAppContext();
  const [planError, setPlanError] = useState(false);

  const storedToken = localStorage.getItem("token");

  const navigate = useNavigate();

  const planId = parseInt(plan_id || "0");

  // TODO: BEFORE GETTING PLAN, NEED TO VERIFY THAT THE USER HAS ACCESSED (EITHER CREATED OR SHARED)
  // PLAN DETAIL NEEDS TO NOT SHOW SHARE / EDIT BUTTONS IF THIS IS A SHARED PLAN
  useEffect(() => {
    checkPlanIds();
  }, [plan_id]);

  // Gets all plan IDs that the user has access to
  const checkPlanIds = async () => {
    try {
      const response = await fetch("/api/users/my-accessible-plans", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });

      const data = await response.json();

      // Checks to see if user has access to planId
      if (data.includes(planId)) {
        await getPlanDetail();
      } else {
        setPlanError(true);
      }
    } catch (error) {
      setPlanError(true);
    }
  };

  const getPlanDetail = async () => {
    try {
      const response = await fetch(`/api/plans/${plan_id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });

      const data = await response.json();

      if (data) {
        setPlan(data.plan);
      }
    } catch (error) {
      console.error("Error fetching plan:", error);
      setPlanError(true);
    }
  };

  console.log(plan);

  return (
    <>
      {!planError && plan && (
        <div className="resultPageContainer">
          <div className="backgroundImageNoVillage"></div>
          <Header variant="relative" />
          {plan && plan.plan_type === "DESTINATION_UNKNOWN" && (
            <Results_Full_Unknown plan={plan} planID={planId} />
          )}
          {plan && plan.plan_type === "DESTINATION_KNOWN" && (
            <Results_Full_Known plan={plan as any} planID={planId} />
          )}
        </div>
      )}

      {planError && (
        <div className="resultPageContainer">
          <h2 style={{ color: "white" }}>
            It looks like you don't have access to this plan.
          </h2>
          <button className="register" onClick={() => navigate("/me")}>
            Go back to my plans
          </button>
        </div>
      )}
    </>
  );
}

export default PlanDetail;
