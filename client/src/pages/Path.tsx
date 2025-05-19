import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function Path() {
  const navigate = useNavigate();

  return (
    <>
      <Header />
      <div className="pathContainer">
        <div className="pathContentContainer">
          <h2>How can we help plan your trip?</h2>
          <div className="pathSelectorBox">
            <h3>blah</h3>
            <img src="" alt="" />
          </div>
          <button type="button" onClick={() => navigate("/build-plan")}>
            I know where I'm going
          </button>
          <button type="button" onClick={() => navigate("/find-destination")}>
            I need help picking
          </button>
        </div>
      </div>
    </>
  );
}

export default Path;
