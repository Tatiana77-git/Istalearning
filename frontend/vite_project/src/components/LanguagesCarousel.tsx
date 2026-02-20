import { useNavigate } from "react-router-dom";
import "./LanguagesCarousel.css";

const flags = [
  { code: "fr", img: "/flags/fr.png", alt: "French" },
  { code: "en", img: "/flags/en.png", alt: "English" },
  { code: "de", img: "/flags/de.png", alt: "German" },
  { code: "ru", img: "/flags/ru.png", alt: "Russian" },
];

function LanguagesCarousel() {
  const navigate = useNavigate();

  return (
    <div className="flags-carousel">
      <div className="flags-track">
        {flags.concat(flags).map((flag, i) => (
          <img
            key={i}
            src={flag.img}
            alt={flag.alt}
            className="flag"
            onClick={() => navigate(`/lang/${flag.code}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default LanguagesCarousel;