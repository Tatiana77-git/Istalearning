import { useState } from "react";
import "./ForgotPasswordPage.css";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage("Veuillez entrer votre email.");
      return;
    }
    
  const emailRegex = /\S+@\S+\.\S+/;
  
    if (!emailRegex.test(email)) {
      setMessage("Veuillez entrer un email valide.");
      return;
}
    try {
      const res = await fetch("http://localhost:3000/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Si cet email existe, un lien de réinitialisation vous a été envoyé.");
      } else {
        setMessage(data.message || "Erreur.");
      }
    } catch (error) {
      setMessage("Erreur serveur.");
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-card">
        <h1>Mot de passe oublié</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button onClick={handleForgotPassword}>
          Envoyer
        </button>

        {message && <p className="forgot-message">{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPasswordPage;