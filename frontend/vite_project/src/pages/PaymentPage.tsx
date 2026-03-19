import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./PaymentPage.css";

function PaymentPage() {
  const { id } = useParams(); //  productId
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:3000/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data.data))
      .catch(() => alert("Erreur chargement produit"));
  }, [id]);

  const handlePayment = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Veuillez vous connecter");
      navigate(`/auth?redirect=/payment/${id}`);
      return;
    }

    try {
      // 1)  purchase в BD
      const purchaseRes = await fetch("http://localhost:3000/purchases", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          product_id: Number(id),
        }),
      });

      const purchaseData = await purchaseRes.json();

      if (!purchaseData.success) {
        alert(purchaseData.message || "Erreur création purchase");
        return;
      }

      const purchaseId = purchaseData.data.id_purchase;

      // 2) creer Stripe session backend
      const sessionRes = await fetch(
        "http://localhost:3000/payments/create-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({
            amount: Number(product.price),
            currency: "eur",
            purchaseId: purchaseId, //  id_purchase from  BD
          }),
        }
      );

       const sessionData = await sessionRes.json();

     if (!sessionData.url) {
       alert("Stripe session error");
         return;
       }

       // 3) redirect Stripe Checkout
        window.location.href = sessionData.url;


    } catch (error) {
      console.log ("payment Error", error);
      alert("Erreur de paiement");
    }
  };

  if (!product) return <p>Chargement...</p>;

  return (
    <div className="payment-page">
      <div className="payment-card">
        <h1>Paiement</h1>

        <h2>{product.title}</h2>
        <p>Langue : {product.language_code}</p>
        <p>Niveau : {product.level}</p>
        <p className="payment-price">{product.price} €</p>

        <p className="payment-info">
          Un email avec le lien du test vous sera envoyé après paiement.
        </p>

        <p className="payment-warning">
          ⚠️ Ce test permet d'evaluer votre niveau et de vous orienter vers le parcours de formation le plus adapté.
        </p>
        <button className="payment-button" onClick={handlePayment}>
          Payer maintenant
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;