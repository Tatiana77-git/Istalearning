


// import { Link } from "react-router-dom";
// import "./Header.css";
// import logo from "../assets/ista.jpg"; // проверь путь и имя файла

// function Header() {
//   return (
//     <header className="site-header">
//       <Link to="/" className="site-logo">
//         <img src={logo} alt="ISTA" />
//       </Link>

//       <nav className="site-nav">
//         <Link to="/">Home</Link>
//         <Link to="/auth">Connection</Link>

//         <div className="dropdown">
//           <button className="dropdown-btn">Langues ▾</button>
//           <div className="dropdown-menu">
//             <Link to="/lang/en">Anglais</Link>
//             <Link to="/lang/fr">Français</Link>
//             <Link to="/lang/de">Allemand</Link>
//             <Link to="/lang/ru">Russe</Link>
//           </div>
//         </div>

//         <Link to="/my-purchases">My purchases</Link>
//       </nav>
//     </header>
//   );
// }

// export default Header;


import { Link } from "react-router-dom";
import { useState } from "react";
import "./Header.css";
import logo from "../assets/ista.jpg";

function Header() {
  const [uiLang, setUiLang] = useState("FR"); // язык интерфейса

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={logo} alt="ISTA" />
      </Link>

      <nav className="nav">
        <Link to="/">{uiLang === "FR" ? "Accueil" : "Home"}</Link>
        <Link to="/auth">
          {uiLang === "FR" ? "Connexion" : "Connection"}
        </Link>

        {/* 1️⃣ Навигация по языкам ПРОДУКТОВ */}
        <div className="dropdown">
          <span className="dropdown-title">Langues ▾</span>
          <div className="dropdown-menu">
          
            <Link to="/lang/fr">Français</Link>
            <Link to="/lang/en">English</Link>
            <Link to="/lang/de">Deutsch</Link>
            <Link to="/lang/ru">Русский</Link>
          </div>
        </div>

        <Link to="/my-purchases">
          {uiLang === "FR" ? "Mes achats" : "My purchases"}
        </Link>

        {/* 2️⃣ Язык ИНТЕРФЕЙСА */}
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
    </header>
  );
}

export default Header;