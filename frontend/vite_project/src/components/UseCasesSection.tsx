import { Link } from "react-router-dom";
import "./UseCasesSection.css";

function UseCasesSection() {
  return (
    <section className="usecases">
      <h2 className="usecases-title">Bienvenue chez ISTALearning !</h2>

      <p className="usecases-text">
        Dans un monde connecté, parler plusieurs langues est essentiel. Que ce
        soit pour étudier à l’étranger, travailler avec des partenaires
        internationaux ou voyager, maîtriser une ou plusieurs langues ouvre des
        portes. Nos certifications facilitent l’accès aux universités, la
        carrière internationale, et simplifient les démarches administratives.
        <br />
        <br />
        Chez ISTALearning, nous vous accompagnons pour atteindre vos objectifs,
        qu’ils soient professionnels, académiques ou personnels. Parlez plusieurs
        langues, ouvrez-vous au monde !
      </p>

      <div className="usecases-grid">
        <Link to="/use/work" className="usecase-card" aria-label="Pour travailler">
          <div className="usecase-circle">
            <img src="/icons/building.png" alt="Building" />
          </div>
          <div className="usecase-label">pour travailler</div>
        </Link>

        <Link
          to="/use/studies"
          className="usecase-card"
          aria-label="Vos études et éducation"
        >
          <div className="usecase-circle">
            <img src="/icons/graduation.png" alt="Graduation" />
          </div>
          <div className="usecase-label">vos études et éducation</div>
        </Link>

        <Link to="/use/integration" className="usecase-card" aria-label="Pour s’intégrer">
          <div className="usecase-circle">
            <img src="/icons/school.png" alt="School" />
          </div>
          <div className="usecase-label">pour s’intégrer</div>
        </Link>
      </div>

      <p className="usecases-text usecases-text--bottom">
        Obtenez une certification officielle, reconnue et valable à vie.
        <br />
        Préparez-vous avec nos experts certifiés et passez votre test en toute confiance.
        <br />
        <br />
        Validez votre niveau. Atteignez vos objectifs.
        <br />
        Certification officielle reconnue, valable à vie.
        <br />
        Préparation experte. Réussite assurée.
      </p>
    </section>
  );
}

export default UseCasesSection;