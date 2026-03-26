import { useState, useEffect } from "react";
import "./HeroBanner.css";

import banner0 from "../assets/banner0.jpg";
import banner1 from "../assets/banner1.jpg"
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";
import banner4 from "../assets/banner4.jpg";
import banner5 from "../assets/banner5.jpg";
import banner6 from "../assets/banner6.jpg";
import banner7 from "../assets/banner7.jpg";
import banner8 from "../assets/banner8.jpg";
import banner9 from "../assets/banner9.jpg";
import banner10 from "../assets/banner10.jpg";
import banner11 from "../assets/banner11.jpg";
import banner12 from "../assets/banner12.jpg";
import banner13 from "../assets/banner13.jpg";
import banner14 from "../assets/banner14.jpg";
import banner15 from "../assets/banner15.jpg";
import banner16 from "../assets/banner16.jpg";
import banner17 from "../assets/banner17.jpg";
import banner18 from "../assets/banner18.jpg";






const slides: { src: string; type: string }[] = [
  { src: banner0, type: "photo" },
  { src: banner1, type: "certificate" },
  { src: banner2, type: "photo" },
  { src: banner3, type: "certificate" },
  { src: banner4, type: "photo" },
  { src: banner5, type: "certificate" },
  { src: banner6, type: "photo" },
  { src: banner7, type: "certificate" },
  { src: banner8, type: "photo" },
  { src: banner9, type: "certificate" },
  { src: banner10, type: "photo" },
  { src: banner11, type: "certificate" },
  { src: banner12, type: "photo" },
  { src: banner13, type: "certificate" },
  { src: banner14, type: "photo" },
  { src: banner15, type: "certificate" },
  { src: banner16, type: "photo" },
  { src: banner17, type: "certificate" },
  { src: banner18, type: "photo" },




];

function HeroBanner() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hero">
   
      <div className="hero-slider">
        <img src={slides[index].src} alt="banner" />
      </div>

     
      <div className="hero-text">
        <h1>Cross-Cultural Studies: Learning and Translating🌍Interpreting Centre ISTALERNING</h1>
        <p>
          Des tests de langues ONLINE rapides, fiables et parfaitement
          objectifs certifiés par les linguistes diplômés.
        </p>
      </div>
    </div>
  );
}

export default HeroBanner;