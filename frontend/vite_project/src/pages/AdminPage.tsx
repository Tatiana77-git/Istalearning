import { useEffect, useState } from "react";
import "./AdminPage.css"


function AdminPage() {
  
  const [purchases, setPurchases] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    // customers
    fetch("http://localhost:3000/admin/customers", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setCustomers(data.data);
        }
      });

    // purchases
    fetch("http://localhost:3000/admin/purchases", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPurchases(data.data);
        }
      });
  }, []);

  return (
    <div className="admin-container">
      <h1>Admin panel</h1>

    

      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer email</th>
            <th>Status</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Created at</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map((purchase) => (
            <tr key={purchase.id_purchase}>
              <td>{purchase.id_purchase}</td>
              <td>{purchase.customer_email}</td>
              <td>{purchase.status}</td>
              <td>{purchase.amount}</td>
              <td>{purchase.currency}</td>
              <td>{purchase.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPage;