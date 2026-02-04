

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
      <strong>{product.price} €</strong>

      <button onClick={handleBuy}>Buy</button>

      

    </div>
  );
}

export default ProductDetailPage;