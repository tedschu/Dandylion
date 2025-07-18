import { useAuth } from "../contexts/AuthContext";
import { useAppContext } from "../contexts/AppContext";
import { useEffect, useState } from "react";

function SharePlan() {
  const storedToken = localStorage.getItem("token");

  const [sharedEmails, setSharedEmails] = useState<string[]>([]);
  const [previouslySharedEmails, setPreviouslySharedEmails] = useState<
    string[]
  >([]);
  const { userInfo, setUserInfo, isLoggedIn, setIsLoggedIn, token, setToken } =
    useAuth();
  const {
    planShareData,
    isShareModalOpen,
    setIsShareModalOpen,
    shouldRefreshPlans,
    setShouldRefreshPlans,
  } = useAppContext();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getPreviouslySharedEmails();
  }, [planShareData]);

  const getPreviouslySharedEmails = async () => {
    try {
      const response = await fetch(
        `/api/users/plan-shared-users/${planShareData.planID}`,
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      const data = await response.json();

      if (data) {
        setPreviouslySharedEmails(data);
      }
    } catch (error) {}
  };

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

    if (email === "") return;

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
          plan_id: planShareData.planID,
          emails: sharedEmails,
        }),
      });

      const data = await response.json();

      // Then send the email invites
      const emailResponse = await fetch("/api/emails/send-plan-invites", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${storedToken}`,
        },
        body: JSON.stringify({
          emails: sharedEmails,
          planData: {
            planID: planShareData.planID,
            destination: planShareData.destination,
          },
          senderName: userInfo.firstName,
          senderEmail: userInfo.email,
          imageUrl: planShareData.imageUrl,
        }),
      });

      const emailData = await emailResponse.json();

      if (emailData.success) {
        console.log("Invites sent successfully!", emailData.message);
        // You could show a success message to the user here
      } else {
        console.error("Failed to send invites:", emailData.message);
      }

      setShouldRefreshPlans(true);
      setIsShareModalOpen(false);
    } catch (error) {
      console.error("Error sharing emails", error);
    }
  };

  const deleteEmailFromPlan = async (email: string, plan_id: number) => {
    try {
      const response = await fetch("/api/users/remove-shared-user", {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${storedToken}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          plan_id: plan_id,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await getPreviouslySharedEmails();
      }

      console.log(data);
    } catch (error) {}
  };

  return (
    <>
      <div className="shareModalOverlay">
        <div className="shareContentContainer">
          <div
            className="close"
            onClick={() => setIsShareModalOpen(false)}
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
          <h3
            style={{
              fontSize: "16px",
              textAlign: "center",
              margin: "5px",
              fontWeight: "normal",
            }}
          >
            Invite others to see your plan:
          </h3>

          <h2 style={{ margin: "0 0 15px 0", fontSize: "18px" }}>
            {planShareData.destination}{" "}
            {planShareData.second_destination !== "" &&
              "and " + planShareData.second_destination}
          </h2>

          <form className="shareFormContainer" action="" onSubmit={submit}>
            <div className="shareFormInputContainer">
              <input
                type="text"
                placeholder="name@example.com"
                name="email"
                style={{
                  border: "none",
                  width: "180px",
                  borderRadius: "5px",
                  padding: "3px",
                }}
              />
              <button
                style={{
                  backgroundColor: "var(--forest-green)",
                  color: "white",
                  padding: "3px 8px",
                  fontSize: "16px",
                }}
              >
                +
              </button>
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
                      backgroundColor: "var(--forest-green)",
                      marginLeft: "7px",
                      borderRadius: "50%",
                      width: "20px",
                      height: "20px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "13px",
                      color: "white",
                      cursor: "pointer",
                    }}
                  >
                    x
                  </div>
                </div>
              ))}
            </div>
          </form>

          {/* ADD CONDITIONAL THAT ARRAY > 0 */}
          {sharedEmails.length > 0 && (
            <button
              className="register"
              type="button"
              onClick={() => shareEmails()}
            >
              Send invites
            </button>
          )}

          {previouslySharedEmails.length > 0 && (
            <div className="shareExistingContainer">
              <p style={{ margin: "10px 0" }}>
                You've already shared this plan with:{" "}
              </p>
              <div className="shareExistingPillContainer">
                {previouslySharedEmails.map((email, index) => {
                  return (
                    <div className="emailPillExisting">
                      {email}{" "}
                      <div
                        onClick={() =>
                          deleteEmailFromPlan(email, planShareData.planID)
                        }
                        style={{
                          backgroundColor: "var(--brand-slate-light)",
                          marginLeft: "7px",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          fontSize: "13px",
                          color: "white",
                          cursor: "pointer",
                        }}
                      >
                        x
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SharePlan;
