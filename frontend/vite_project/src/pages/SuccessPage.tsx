import { useEffect } from "react";
import "./SuccessPage.css";

function SuccessPage() {

  useEffect(() => {

    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get("session_id");

    if (!sessionId) return;

    fetch("http://localhost:3000/payments/confirm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionId: sessionId
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log("Payment confirmed:", data);
    })
    .catch(err => {
      console.error("Confirm error:", err);
    });

  }, []);

  return (
    <div className="success-page">
      <div className="success-card">
        <h1>Payment confirmé ✅</h1>

        <p>
          Le lien vers votre test a été envoyé à votre adresse e-mail.
        </p>
      </div>
    </div>
  );
}

export default SuccessPage;