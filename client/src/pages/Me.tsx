import { useEffect, useState } from "react";
import Header from "../components/Header";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { h2 } from "motion/react-client";

type Plan = {
  result_data: {
    destination: {
      location: string;
    };
    // add other properties if needed
  };
  // add other properties if needed
};

function Me() {
  const { userInfo } = useAuth();
  const storedToken = localStorage.getItem("token");
  const [userPlans, setUserPlans] = useState<Plan[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getUserPlans();
  }, []);

  const getUserPlans = async () => {
    try {
      const response = await fetch("/api/users/my-plans", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
      });

      const data = await response.json();

      const finalData = JSON.stringify(data.plansFormattedDates);

      console.log(data);

      if (data) {
        setUserPlans(data.plansFormattedDates);
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="myAccountContainer">
        <Header />
        <div className="myAccountContentContainer">
          <h1>
            Hey there, {userInfo.firstName}. Your email: {userInfo.email}
          </h1>
          {userPlans.map((plan) => {
            return (
              <>
                <h2>test {plan.result_data.destination.location}</h2>
              </>
            );
          })}

          <button onClick={() => navigate("/")}>Go home</button>
        </div>
      </div>
    </>
  );
}

export default Me;
