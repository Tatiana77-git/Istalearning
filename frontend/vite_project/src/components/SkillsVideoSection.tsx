import "./SkillsVideoSection.css";

const skills = [
  {
    video: "/videos/speaking.mp4",
    title: "Expression Orale",
    subtitle: "(Speaking)",
    text: `Présentez une conversation ou répondez à des questions en langue concernée. Vous êtes attendu pour montrer votre aisance à l'oral, votre prononciation et votre capacité à vous exprimer clairement. Vous devez vous préparer à parler spontanément afin de réussir cette partie du certificat.`,
  },
  {
    video: "/videos/writing.mp4",
    title: "Expression Écrite",
    subtitle: "(Writing)",
    text: `À rédiger un texte sur un sujet donné. Il sera évalué sur la cohérence, la grammaire, le vocabulaire et la capacité à communiquer ses idées clairement. Une bonne préparation permet de montrer la maîtrise de l'écrit et d'obtenir un meilleur score pour le certificat.`,
  },
  {
    video: "/videos/listening.mp4",
    title: "Compréhension Orale",
    subtitle: "(Listening)",
    text: `Vous écouterez un extrait audio et devrez répondre aux questions pour montrer votre compréhension orale.`,
  },
  {
    video: "/videos/reading.mp4",
    title: "Compréhension Écrite",
    subtitle: "(Reading)",
    text: `Il s'agit de lire un texte dans la langue étudiée, puis de répondre à des questions pour montrer votre capacité à comprendre et analyser un texte écrit.`,
  },
  {
    video: "/videos/grammar.mp4",
    title: "Grammaire",
    subtitle: "(Grammar)",
    text: `Il s’agit d’exercices variés où vous devrez compléter des phrases grammaticalement correctes, choisir les formes correctes des verbes, noms, adjectifs ou pronoms, et effectuer d’autres tâches liées à la grammaire dans la langue étudiée.`,
  },
];

export default function SkillsVideoSection() {
  return (
    <section className="skills-section">
      <div className="skills-container">
        {skills.map((skill, index) => (
          <div key={index} className="skill-card">
            <video
              className="skill-video"
              src={skill.video}
              controls
            />
            <h3 className="title">{skill.title}</h3>
            <p className="subtitle">{skill.subtitle}</p>
            <p className="description">{skill.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}