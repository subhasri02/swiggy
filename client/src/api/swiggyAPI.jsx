const BASE_URL = "https://www.swiggy.com/dapi";

const DEFAULT_COORDS = {
  lat: 12.9716,
  lng: 77.5946, // Bangalore
};

// Fetch all restaurants
export const fetchRestaurants = async () => {
  try {
    const res = await fetch(
      `${BASE_URL}/restaurants/list/v5?lat=${DEFAULT_COORDS.lat}&lng=${DEFAULT_COORDS.lng}`
    );
    const data = await res.json();

    const restaurants =
      data?.data?.cards
        ?.find((c) => c?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        ?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];

    return restaurants;
  } catch (error) {
    console.error("Error fetching restaurants:", error);
    return [];
  }
};

// // Fetch single restaurant menu => not fetching
// export const fetchRestaurantMenu = async (restaurantId) => {
//   try {
//     const res = await fetch(
//       `${BASE_URL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${DEFAULT_COORDS.lat}&lng=${DEFAULT_COORDS.lng}&restaurantId=${restaurantId}`
//     );
//     const data = await res.json();
//     return data?.data;
//   } catch (error) {
//     console.error("Error fetching menu:", error);
//     return null;
//   }
// };
