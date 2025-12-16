// // src/api/mealsAPI.js
// export const fetchCategories = async () => {
//   const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
//   const data = await res.json();
//   return data.categories;
// };

// export const fetchMealsByCategory = async (category) => {
//   const url =
//     category === "All"
//       ? "https://www.themealdb.com/api/json/v1/1/search.php?s="
//       : `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;
//   const res = await fetch(url);
//   const data = await res.json();
//   return data.meals || [];
// };

// //  Added function for search
// export const searchMeals = async (query) => {
//   const res = await fetch(
//     `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
//   );
//   const data = await res.json();
//   return data.meals || [];
// };
