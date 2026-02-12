import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./MyPurchasesPage.css";

function MyPurchasesPage() {
  const [purchases, setPurchases] = useState<any[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    // если пользователь не залогинен → на auth
    if (!token) {
      navigate("/auth");
      return;
    }

    fetch("http://localhost:3000/purchases/my", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPurchases(data.data);
        } else {
          setError("Cannot load purchases");
        }
      })
      .catch(() => {
        setError("Server error");
      });
  }, [navigate]);

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="mypurchases-container">
      <h1>My purchases</h1>

      {purchases.length === 0 && (
        <p className="empty">You have no purchases yet</p>
      )}

      {purchases.map((purchase) => (
        <div key={purchase.id_purchase} className="purchase-card">
          <p>Product ID: {purchase.product_id}</p>
          <p>Status: {purchase.status}</p>
          <p>Amount: {purchase.amount} €</p>
          <p>Date: {purchase.created_at}</p>
        </div>
      ))}
    </div>
  );
}

export default MyPurchasesPage;