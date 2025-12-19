
export const placeOrder = async (order) => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please login to place order");
  }

  const res = await fetch("http://localhost:8000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(order),
  });

  return res.json();
};
