import { useParams } from "react-router-dom";
import { apiResponse } from "../types/types";
import { useEffect, useState } from "react";
import Results_Full_Unknown from "../components/destinationUnknownPath/results/Results_Full_Unknown";
import Results_Full_Known from "../components/destinationKnownPath/results/Results_Full_Known";
import Header from "../components/Header";

type PlanDetailType = {
  plan_type: string;
  result_data: apiResponse;
};

function PlanDetail() {
  const { plan_id } = useParams();
  const [planData, setPlanData] = useState<PlanDetailType>();
  const storedToken = localStorage.getItem("token");

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

      console.log("Here is the planDetail data: ", data.planData);

      if (data) {
        setPlanData(data.planData);
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="resultPageContainer">
        <Header />
        {planData && planData.plan_type === "DESTINATION_UNKNOWN" && (
          <Results_Full_Unknown apiResponse={planData.result_data} />
        )}
        {planData && planData.plan_type === "DESTINATION_KNOWN" && (
          <Results_Full_Known apiResponse={planData.result_data} />
        )}
      </div>
    </>
  );
}

export default PlanDetail;
