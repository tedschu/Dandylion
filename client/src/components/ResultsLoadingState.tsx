import "@material/web/progress/circular-progress.js";

function ResultsLoadingState() {
  return (
    <>
      {/* PUT COMPONENT FOR LOADING STATE HERE */}

      {/* @ts-ignore */}
      <md-circular-progress four-color indeterminate />

      <h2>It takes a moment to cover the entire world...</h2>
    </>
  );
}

export default ResultsLoadingState;
