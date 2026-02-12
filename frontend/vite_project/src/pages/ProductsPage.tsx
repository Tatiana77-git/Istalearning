

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./ProductsPage.css";
import engFlag from "../assets/eng.jpg";
import frFlag from "../assets/fr.jpg";
import deFlag from "../assets/de.jpg";
import ruFlag from "../assets/ru.jpg"

import certificateImage from "../assets/certificate.jpg";

function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const navigate = useNavigate();
  const {code} = useParams();

  let bannerImage = engFlag;

  if (code === "fr") {
    bannerImage = frFlag;
  }
  
  if (code === "de") {
    bannerImage = deFlag;

  }

  if (code === "ru") {
    bannerImage = ruFlag;
  }
  useEffect(() => {
    fetch(`http://localhost:3000/products?lang=${code}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.data);
        }
      });
  }, [code]);

  return (
    <div className="products-page">

      {/* Banner */}
      <div className="products-banner">
        <img src={bannerImage} alt="English banner" />
      </div>

      {/* Cards */}
      <div className="products-container">
        {products.map((product) => (
          <div key={product.id_product} className="product-card">

            <div className="product-image">
              <img src={certificateImage} alt="Certificate" />
            </div>

            <h3 className="product-title">{product.title}</h3>

            <p className="product-price">{product.price} €</p>

            <button
              className="product-button"
              onClick={() => navigate(`/products/${product.id_product}`)}
            >
              Voir plus
            </button>

          </div>
        ))}
      </div>

    </div>
  );
}

export default ProductsPage;