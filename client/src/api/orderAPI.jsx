export const placeOrder = async (order) => {
  const res = await fetch("http://localhost:8000/api/orders", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return res.json();
};
