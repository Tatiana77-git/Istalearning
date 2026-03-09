
 import { useEffect, useState } from "react";
 import { useParams } from "react-router-dom";
 import { useNavigate } from "react-router-dom";
 import"./ProductDetailPage.css";



 function ProductDetailPage() {
   const navigate = useNavigate();
   const { id } = useParams();
   const [loading, setLoading] = useState(true);
   const [product, setProduct] = useState<any>(null);

   const getCertificatePath =(language:string, level:string)=> {
     return `/certificates/${language.toLowerCase()}_${level}.png`;
  }

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

    const token = localStorage.getItem("token");
    let isAdmin = false ;

    if (token) {
      try{
        const payload = JSON.parse(atob(token.split(".")[1]));
        isAdmin= payload.isAdmin;
      }
        catch (error) {
        console.error("Invalid token", error);
      }
    }

   const handleBuy = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate(`/auth?redirect=/products/${id}`);
      return;
    }

    navigate(`/payment/${id}`);
  };


  return (
  <div className="product-detail-page">
    <div className="product-detail-card">
      <div className="product-detail-image">
        <img
          src={getCertificatePath(product.language_code, product.level)}
          alt="Certificate"
        />
      </div>

      <div className="product-detail-content">
        <h1 className="product-title">{product.title}</h1>

        <p className="product-price">{product.price} €</p>

        <div>
          <p className="product-description">
          {product.description}
          </p>
        </div>

        {!isAdmin && (
          <button className="buy-button" onClick={handleBuy}>
            Acheter le test
          </button>
        )}

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

