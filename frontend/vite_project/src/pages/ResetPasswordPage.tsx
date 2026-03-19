import { useState } from "react";
import { useParams } from "react-router-dom";
import "./ForgotPasswordPage.css";

function ResetPasswordPage() {
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async () => {
    if (!password) {
      setMessage("Veuillez entrer un nouveau mot de passe.");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (data.success) {
        setMessage("Mot de passe mis à jour.");
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
        <h1>Nouveau mot de passe</h1>

        <input
          type="password"
          placeholder="Nouveau mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleResetPassword}>
          Réinitialiser
        </button>

        {message && <p className="forgot-message">{message}</p>}
      </div>
    </div>
  );
}

export default ResetPasswordPage;