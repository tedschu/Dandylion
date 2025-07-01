import { useParams } from "react-router-dom";
import { Plan, PlanKnown } from "../types/types";
import { useEffect, useState } from "react";
import Results_Full_Unknown from "../components/destinationUnknownPath/results/Results_Full_Unknown";
import Results_Full_Known from "../components/destinationKnownPath/results/Results_Full_Known";
import Header from "../components/Header";
import { useAppContext } from "../contexts/AppContext";

function PlanDetail() {
  const { plan_id } = useParams();
  const { plan, setPlan } = useAppContext();

  const storedToken = localStorage.getItem("token");

  const planId = parseInt(plan_id || "0");

  useEffect(() => {
    getPlanDetail();
  }, [plan_id]);

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
    } catch (error) {}
  };

  console.log(plan);

  return (
    <>
      <div className="resultPageContainer">
        <Header />
        {plan && plan.plan_type === "DESTINATION_UNKNOWN" && (
          <Results_Full_Unknown plan={plan} planID={planId} />
        )}
        {plan && plan.plan_type === "DESTINATION_KNOWN" && (
          <Results_Full_Known plan={plan as any} planID={planId} />
        )}
      </div>
    </>
  );
}

export default PlanDetail;
