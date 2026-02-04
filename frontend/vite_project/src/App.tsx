
import {Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage"
import AuthPage from "./pages/AuthPage";



function App() {
  return (
   
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/auth" element= {<AuthPage />} />
      
      </Routes>
    
  );
}

export default App;