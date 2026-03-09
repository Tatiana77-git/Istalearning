
import {Routes, Route } from "react-router-dom";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailPage from "./pages/ProductDetailPage"
import AuthPage from "./pages/AuthPage";
import MyPurchasesPage from "./pages/MyPurchasesPage";
import Header from "./pages/Header";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import UsagePage from "./pages/UsagePage";
import PaymentPage from "./pages/PaymentPage";
import SuccessPage from "./pages/SuccessPage";



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
        <Route path="/work" element={<UsagePage />} />
        <Route path="/studies" element={<UsagePage />} />
        <Route path="/integration" element={<UsagePage />} />
        <Route path="/payment/:id" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage />} />

      
      </Routes>
    </>
  );
}

export default App;