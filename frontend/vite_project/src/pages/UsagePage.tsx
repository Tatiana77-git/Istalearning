import { useLocation, useNavigate } from "react-router-dom";
import "./UsagePage.css";

type PageKey = "work" | "studies" | "integration";

const PAGES: Record<PageKey, {
  icon: string;
  title: string;
  intro: string;
  bullets: string[];
  outro: string;
  call: string;
  badges: { title: string; text: string }[];
}> = {
  work: {
    icon: "/icons/work.png",
    title: "Travail & Carrière internationale",
    intro:
      "Dans de nombreux pays, les employeurs exigent une preuve officielle du niveau de langue. Sans certification, les candidats étrangers rencontrent souvent des refus, des postes sous-qualifiés ou des difficultés à faire reconnaître leurs compétences.",
    bullets: [
      "Refus d’embauche",
      "Perte d’opportunités professionnelles",
      "Difficulté à communiquer en milieu professionnel",
      "Manque de confiance lors des entretiens",
    ],
    outro:
      "Nos tests vous permettent d’évaluer votre niveau réel et d’obtenir une certification reconnue, facilitant votre intégration professionnelle et valorisant votre profil auprès des recruteurs.",
    call: "Prenez le contrôle de votre avenir professionnel dès aujourd’hui.",
    badges: [
      { title: "Rapide", text: "Résultat clair en quelques minutes." },
      { title: "Fiable", text: "Évaluation objective et structurée." },
      { title: "Reconnu", text: "Valorisez votre profil auprès des recruteurs." },
    ],
  },

  studies: {
    icon: "/icons/studies.png",
    title: "Études & Formation internationale",
    intro:
      "Les universités et établissements de formation exigent souvent un certificat de niveau de langue pour l’admission. Sans ce document, les étudiants peuvent voir leur candidature refusée ou retardée.",
    bullets: [
      "Peur de ne pas être accepté dans l’établissement souhaité",
      "Incertitude sur son niveau réel",
      "Difficultés à suivre les cours dans une langue étrangère",
      "Démarches administratives complexes",
    ],
    outro:
      "Nos tests vous aident à connaître votre niveau exact et à obtenir une certification fiable, facilitant votre admission et votre réussite académique.",
    call: "Préparez sereinement votre avenir académique.",
    badges: [
      { title: "Clair", text: "Comprenez votre niveau immédiatement." },
      { title: "Guidé", text: "Ciblez vos points à améliorer." },
      { title: "Utile", text: "Renforcez votre dossier d’admission." },
    ],
  },

  integration: {
    icon: "/icons/integration.png",
    title: "Intégration & Vie à l’étranger",
    intro:
      "S’intégrer dans un nouveau pays nécessite bien plus que des démarches administratives. La maîtrise de la langue est essentielle pour travailler, communiquer et construire une nouvelle vie.",
    bullets: [
      "Isolement social dû à la barrière linguistique",
      "Difficultés administratives",
      "Manque de confiance dans les interactions quotidiennes",
      "Exigences linguistiques pour la naturalisation",
    ],
    outro:
      "Nos tests vous permettent d’évaluer votre niveau et de répondre aux exigences officielles tout en facilitant votre intégration et votre autonomie.",
    call: "Faites le premier pas vers une intégration réussie.",
    badges: [
      { title: "Concret", text: "Sachez où vous en êtes vraiment." },
      { title: "Sûr", text: "Préparez vos démarches officielles." },
      { title: "Autonome", text: "Gagnez en confiance au quotidien." },
    ],
  },
};

function getKeyFromPath(pathname: string): PageKey {
  if (pathname === "/studies") return "studies";
  if (pathname === "/integration") return "integration";
  return "work";
}

function UsagePage() {
  const location = useLocation();
  const navigate = useNavigate();

  const key = getKeyFromPath(location.pathname);
  const page = PAGES[key];

  const handleStart = () => {
    const lang = prompt("Choisissez une langue : fr, en, de, ru");
    if (!lang) return;

    const code = lang.trim().toLowerCase();


    navigate(`/lang/${code}`);
  };

  return (

    <div className="usage-page">
      <div className="usage-iconWrap">
        <img src={page.icon} alt="icon" className="usage-icon" />
      </div>

      <h1 className="usage-title">{page.title}</h1>

      <div className="usage-grid">
 
        <div className="usage-card">
          <p className="usage-text">{page.intro}</p>

          <ul className="usage-list">
            {page.bullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          <p className="usage-text usage-textBottom">{page.outro}</p>
        </div>

 
        <div className="usage-side">
  <p className="usage-avec">Avec nous</p>

  {page.badges.map((b) => (
      <div className="usage-badge" key={b.title}>
      <div className="usage-badgeTitle">{b.title}</div>
      <div className="usage-badgeSmall">{b.text}</div>
    </div>
  ))}
</div>
      </div>

      <p className="usage-call">{page.call}</p>

      <button className="usage-button" onClick={handleStart}>
        Commencer le test
      </button>
    </div>
  );
}

export default UsagePage;