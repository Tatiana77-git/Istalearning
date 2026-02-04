
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProductsPage.css";



function ProductsPage() {
  const navigate = useNavigate ();
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
      })
      .catch(() => {
        setError("Cannot load products");
      });
  }, []);

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container">
      <h1>Products</h1>

      {products.map((product) => (
        <div key={product.id_product} className="product">
          <h2>{product.title}</h2>
          <p>Price: {product.price} €</p>

          <button onClick={() => navigate(`/products/${product.id_product}`)}>
            Voir plus
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductsPage;