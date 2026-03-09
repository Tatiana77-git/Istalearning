

import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import logo from "../assets/ista.jpg";

function Header() {
  const [uiLang, setUiLang] = useState("FR"); 
  const [menuOpen, setMenuOpen] = useState(false);
  const token= localStorage.getItem("token");

  let isAdmin = false;

  if (token) {
    try { const payload= JSON.parse(atob(token.split(".")[1]));;
      isAdmin = payload.isAdmin;
    }
    catch (error)  {
        console.error("Invalid token:", error);
    }
   
    
  }

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={logo} alt="ISTA" />
      </Link>

    <button className="burger" onClick={() => setMenuOpen(!menuOpen)}>
    =
    </button>

      <nav className={`nav ${menuOpen ? "open" : ""}`}>
        <Link to="/">{uiLang === "FR" ? "Accueil" : "Home"}</Link>
        <Link to="/auth">
          {uiLang === "FR" ? "Connexion" : "Connection"}
        </Link>

     
        <div className="dropdown">
          <span className="dropdown-title">Langues ▾</span>
          <div className="dropdown-menu">
          
            <Link to="/lang/fr">Français</Link>
            <Link to="/lang/en">English</Link>
            <Link to="/lang/de">Deutsch</Link>
            <Link to="/lang/ru">Русский</Link>
          </div>
        </div>

        {!isAdmin && (
          <Link to="/my-purchases">
            {uiLang === "FR" ? "Mes achats" : "My purchases"}
          </Link>
        )}

         {isAdmin && (<Link to ="/admin">Admin</Link>)}

  
        <div className="dropdown">
          <span className="dropdown-title">🌍 {uiLang} ▾</span>
          <div className="dropdown-menu">
            <span onClick={() => setUiLang("FR")}>Français</span>
            <span onClick={() => setUiLang("EN")}>English</span>
            <span onClick={() => setUiLang("DE")}>Deutsch</span>
            <span onClick={() => setUiLang("RU")}>Русский</span>
          </div>
        </div>
      </nav>

       {token && (
        <button
         onClick={() => {
            localStorage.removeItem("token");
            window.location.href ="/";
         }}
         >Logout</button>
       )}


    </header>
  );
}

export default Header;