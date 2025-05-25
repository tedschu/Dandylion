function BadWordsAlert() {
  return (
    <>
      <div
        className="badWordsAlertContainer"
        style={{
          backgroundColor: "var(--error)",
          padding: "0px 8px",
          borderRadius: "8px",
        }}
      >
        <p style={{ color: "white" }}>Please, no naughty words :)</p>
      </div>
    </>
  );
}

export default BadWordsAlert;
