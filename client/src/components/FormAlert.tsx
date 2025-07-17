function FormAlert() {
  return (
    <>
      <div
        className="badWordsAlertContainer"
        style={{
          backgroundColor: "var(--error)",
          padding: "5px 8px",
          borderRadius: "8px",
        }}
      >
        <p style={{ color: "white", fontSize: "16px" }}>
          Make sure you've answered all the questions
        </p>
      </div>
    </>
  );
}

export default FormAlert;
