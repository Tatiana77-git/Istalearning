import { useNavigate } from "react-router-dom";
import ista from "../assets/ista.jpg"
import "./Footer.css";

function Footer() {
  const navigate = useNavigate();

  const handleStartTest = () => {
    const lang = prompt("Choisissez une langue : fr, en, de, ru");
    if (lang) {
      navigate(`/lang/${lang}`);
    }
  };

  return (
    <footer className="footer">

      <div className="footer-cta">
        <div className="cta-text">
          <h2>Évaluez votre niveau linguistique</h2>
          <p>avec nos tests préformation.</p>
        </div>

        <button className="cta-button" onClick={handleStartTest}>
          Commencer le test
        </button>
      </div>

   
      <div className="footer-main">

        <div className="footer-left">
          <div className="footer-ista">
            <img src={ista} alt="ISTA Learning" />
          </div>


<div className="footer-legal">
 <p>
  Adresse : 38 rue Charles de Gaulle, 68370 Orbey (France)<br />
  autoentrepreneur – traductrice-interprète auprès du Tribunal de Colmar depuis 2015<br />
  adresse mail : istalearning@gmail.com | téléphone +33 6 52 77 89 22<br />
  website: www.istalearning.com<br />
  N° SIRET : 830 997 888 00029 | R.C.S. Colmar | Code APE : 8559B
</p>

  <div className="footer-links">
    <a href="docs/CGV.pdf" target="_blank" rel="noopener noreferrer">Conditions Générales de Vente</a>
    <a href="docs/Politique de confidentialité.pdf" target="_blank" rel="noopener noreferrer">Politique de confidentialité</a>
  </div>
</div>
    
        </div>

        <div className="footer-right">

          <div className="social-icons">
            <a href="https://chat.whatsapp.com/EKy683NY5xEFms2h1WUxi0?mode=hq1tshi" target="_blank" rel="noopener noreferrer"><img src="/icons/whatsapp.png" alt="WhatsApp" /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><img src="/icons/linkedin.png" alt="LinkedIn" /></a>
            <a href="#" target="_blank" rel="noopener noreferrer"><img src="/icons/tiktok.png" alt="TikTok" /></a>
            <a href="https://www.instagram.com/studyinfrance.katrin?igsh=dDFvcTh1Ymllb3Zy&utm_source=qr" target="_blank" rel="noopener noreferrer"><img src="/icons/instagram.png" alt="Instagram" /></a>
            <a href="https://youtube.com/@istalearning.fr_ekaterinayakub?si=lzBVVZpBoaOAQNZAs"  target="_blank" rel="noopener noreferrer"><img src="/icons/youtube.png" alt="YouTube" /></a>
            <a href="https://t.me/studyinfranceKATRIN" target="_blank" rel="noopener noreferrer"><img src="/icons/telegram.png" alt="Telegram" /></a>
           
          </div>

          <p className="footer-slogan">Votre niveau, notre expertise</p>
        </div>

      </div>

   
      <div className="footer-bottom">
        <p>ISTA 2025–2026 © Tous droits réservés </p>
        <a href="#">Cookies</a>
      </div>

    </footer>
  );
}

export default Footer;