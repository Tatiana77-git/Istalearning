
import {Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage"
import AuthPage from "./pages/AuthPage";
import MyPurchasesPage from "./pages/MyPurchasesPage";
import Header from "./pages/Header";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";



function App() {
  return (
    <>
   <Header />

      <Routes>
        <Route path="/" element = {<HomePage />} />
        <Route path="/lang/:code" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/auth" element= {<AuthPage />} />
        <Route path="/my-purchases" element = {<MyPurchasesPage />} />
        <Route path ="/admin" element = { <AdminPage />} />
      
      </Routes>
    </>
  );
}

export default App;