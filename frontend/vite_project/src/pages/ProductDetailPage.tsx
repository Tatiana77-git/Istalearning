

 import { useEffect, useState } from "react";
 import { useParams } from "react-router-dom";
 import { useNavigate } from "react-router-dom";
 import"./ProductDetailPage.css";


 function ProductDetailPage() {
   const navigate = useNavigate();
   const { id } = useParams();
   const [product, setProduct] = useState<any>(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
     if (!id) return;



       fetch(`http://localhost:3000/products/${id}`)
         .then((res) => res.json())
         .then((data) => {
           console.log("api response:", data);
           setProduct(data.data);
           setLoading(false);
        });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found</p>;

  const handleBuy = () => {
   const token = localStorage.getItem("token");

   if (!token) {
     navigate(`/auth?redirect=/products/${id}`);
     return;
   }

   fetch("http://localhost:3000/purchases", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
       Authorization: "Bearer " + token,
     },
     body: JSON.stringify({
       product_id: Number(id),
     }),
   })
     .then((res) => res.json())
     .then(() => {
       alert("Purchase created ✅");
     })
     .catch(() => {
       alert("Purchase failed ❌");
     });
 };

  return (
  <div className="product-detail-page">
    <div className="product-detail-card">

      {/* Certificate */}
      <div className="product-detail-image">
        <img
          src="/src/assets/certificate.jpg"
          alt="Certificate"
        />
      </div>

      {/* Content */}
      <div className="product-detail-content">
        <h1 className="product-title">{product.title}</h1>

        <p className="product-price">{product.price} €</p>

        <div>
          <p className="product-description">
          {product.description}
          </p>
        </div>

        <button className="buy-button" onClick={handleBuy}>
          Acheter le test
        </button>

        <p className="auth-link">
          Vous n’avez pas de compte ?{" "}
          <span onClick={() => navigate("/auth")}>
            Inscrivez-vous
          </span>
        </p>
      </div>

    </div>
  </div>
);
 }

 export default ProductDetailPage;

