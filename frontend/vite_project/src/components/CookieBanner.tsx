import { useState, useEffect } from "react";
import "./CookieBanner.css";

function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookieAccepted");
    if (!accepted) setVisible(true);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieAccepted", "true");
    setVisible(false);
  };

  const refuseCookies = () => {
    localStorage.setItem("cookieAccepted", "false");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <p>
        Ce site utilise des cookies pour améliorer votre expérience et garantir
        le bon fonctionnement du site.
      </p>

      <div className="cookie-buttons">
        <button className="btn-refuse" onClick={refuseCookies}>
          Refuser
        </button>
        <button className="btn-accept" onClick={acceptCookies}>
          Accepter
        </button>
      </div>
    </div>
  );
}

export default CookieBanner;