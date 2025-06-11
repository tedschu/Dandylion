import { useAuth } from "../contexts/AuthContext";

function SharePlan() {
  return (
    <>
      <div className="shareContentContainer">
        <h1>Share your plan</h1>
        <p>Invite others to see your plan:</p>
        <form className="shareFormContainer" action="">
          <div className="shareFormInputContainer">
            <input type="text" />
            <button>Add email</button>
          </div>
          <div className="shareFormEmailList">
            <p>email</p>
            <p>email</p>
          </div>
        </form>
        <button>Send invites</button>
      </div>
    </>
  );
}

export default SharePlan;
