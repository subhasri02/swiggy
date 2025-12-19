
import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]); // always array
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) return;

    const fetchOrders = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/admin/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        //  extract array safely
        setOrders(Array.isArray(res.data.orders) ? res.data.orders : []);
      } catch (err) {
        console.error("Failed to load orders", err);
        setOrders([]); // prevent crash
        alert("Admin access only");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(
        `http://localhost:8000/api/admin/orders/${orderId}`, // ✅ CORRECT ROUTE
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      //  update UI safely
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status } : order
        )
      );
    } catch (err) {
      console.error("Failed to update status", err);
      alert("Failed to update order status");
    }
  };

  if (loading) {
    return (
      <div className="p-6 text-gray-500">Loading orders...</div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Admin – All Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white p-4 rounded-xl shadow"
            >
              <p>
                <b>User:</b>{" "}
                {order.userId?.email || "N/A"}
              </p>
              <p>
                <b>Total:</b> ₹{order.totalAmount}
              </p>
              <p>
                <b>Status:</b> {order.status}
              </p>

              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(order._id, e.target.value)
                }
                className="mt-3 border px-3 py-2 rounded"
              >
                <option value="Placed">Placed</option>
                <option value="Preparing">Preparing</option>
                <option value="Out for Delivery">
                  Out for Delivery
                </option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
