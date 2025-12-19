export const getMenuByRestaurant = async (restaurantId) => {
  const res = await fetch(
    `http://localhost:8000/api/menu/${restaurantId}`
  );
  return res.json();
};
 