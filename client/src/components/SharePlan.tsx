import { useAuth } from "../contexts/AuthContext";
import { useAppContext } from "../contexts/AppContext";
import { useState } from "react";

function SharePlan() {
  const storedToken = localStorage.getItem("token");

  const [sharedEmails, setSharedEmails] = useState<string[]>([]);
  const { userInfo, setUserInfo, isLoggedIn, setIsLoggedIn, token, setToken } =
    useAuth();
  const { planID } = useAppContext();
  const [showAlert, setShowAlert] = useState(false);

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;

    // Ensures that the user isn't adding themselves
    if (email === userInfo.email) {
      setShowAlert(true);
      event.currentTarget.reset();
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
      return;
    }

    setSharedEmails((prevState) => [...prevState, email]);

    event.currentTarget.reset();
  };

  //   Removes email chip
  const removeEmail = (emailToRemove: string) => {
    setSharedEmails((prevState) =>
      prevState.filter((email) => email !== emailToRemove)
    );
  };

  const shareEmails = async () => {
    try {
      const response = await fetch("/api/users/share-plan-users", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          // UPDATE PLAN_ID TO BE DYNAMIC WHEN THIS COMPONENT IS RENDERED INSIDE OF INDIVIDUAL PLAN COMPONENTS *********
          plan_id: 16,
          emails: sharedEmails,
        }),
      });

      const data = await response.json();

      //  TODO: ADD EMAIL SENDING FUNCTIONALITY **************
    } catch (error) {
      console.error("Error sharing emails", error);
    }
  };

  return (
    <>
      <div className="shareContentContainer">
        <h1>Share your plan</h1>
        <p>Invite others to see your plan:</p>
        <form className="shareFormContainer" action="" onSubmit={submit}>
          <div className="shareFormInputContainer">
            <input
              type="text"
              placeholder="name@example.com"
              name="email"
              style={{
                border: "none",
                width: "200px",
                borderRadius: "5px",
                padding: "3px",
              }}
            />
            <button>Add</button>
          </div>
          {showAlert && (
            <h2 style={{ color: "red" }}>
              You can't share this plan with your email
            </h2>
          )}
          <div className="shareFormEmailList">
            {sharedEmails.map((email, index) => (
              <div className="emailPill" key={index}>
                {email}
                <div
                  onClick={() => removeEmail(email)}
                  style={{
                    backgroundColor: "#298064",
                    marginLeft: "5px",
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "13px",
                    color: "white",
                  }}
                >
                  x
                </div>
              </div>
            ))}
          </div>
        </form>
        <button
          className="register"
          type="button"
          onClick={() => shareEmails()}
        >
          Send invites
        </button>
      </div>
    </>
  );
}

export default SharePlan;
