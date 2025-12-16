// /* swiggy version */

// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import { fetchRestaurantMenu } from "../api/swiggyAPI";

// const Restaurant = () => {
//   const { id } = useParams();
//   const [menu, setMenu] = useState(null);

//   useEffect(() => {
//     const loadMenu = async () => {
//       const data = await fetchRestaurantMenu(id);
//       setMenu(data);
//     };
//     loadMenu();
//   }, [id]);

//   if (!menu)
//     return <p className="text-center mt-10 text-gray-500">Loading menu...</p>;

//   const info = menu.cards?.find((c) => c.card?.card?.info)?.card?.card;
//   const itemCards =
//     menu.cards
//       ?.find((c) => c.groupedCard)
//       ?.groupedCard?.cardGroupMap?.REGULAR?.cards?.flatMap(
//         (c) => c.card?.card?.itemCards || []
//       ) || [];

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen">
//       <Link to="/" className="text-blue-500 underline text-sm">
//         ← Back to Restaurants
//       </Link>

//       <div className="mt-4">
//         <h1 className="text-2xl font-bold">{info?.name}</h1>
//         <p className="text-gray-600">{info?.cuisines?.join(", ")}</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
//         {itemCards.map((item) => (
//           <div
//             key={item.card.info.id}
//             className="p-4 bg-white shadow rounded-xl flex justify-between items-center"
//           >
//             <div>
//               <h3 className="font-semibold">{item.card.info.name}</h3>
//               <p className="text-gray-500 text-sm">
//                 ₹
//                 {item.card.info.price / 100 ||
//                   item.card.info.defaultPrice / 100 ||
//                   "—"}
//               </p>
//             </div>
//             {item.card.info.imageId && (
//               <img
//                 src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_200/${item.card.info.imageId}`}
//                 alt={item.card.info.name}
//                 className="w-20 h-20 rounded-lg object-cover"
//               />
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Restaurant;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMenuByRestaurant } from "../api/menuApi";
import { useCart } from "../context/CartContext";

const Restaurant = () => {
  const { resId } = useParams();

  const [menu, setMenu] = useState({
    restaurantName: "",
    menuItems: [],
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart, cart, increaseQty, decreaseQty } = useCart();

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const data = await getMenuByRestaurant(resId);
        setMenu({
          restaurantName: data.restaurantName,
          menuItems: data.menuItems || [],
        });
      } catch (err) {
        setError("Menu not found");
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, [resId]);

  const getQty = (id) =>
    cart.find((i) => i.itemId === id)?.quantity || 0;

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <Link to="/" className="text-blue-500 underline">← Back</Link>

      <h1 className="text-2xl font-bold mt-4">
        {menu.restaurantName}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {menu.menuItems.length === 0 ? (
          <p>No menu items available</p>
        ) : (
          menu.menuItems.map((item) => {
            const qty = getQty(item.itemId);

            return (
              <div
                key={item.itemId}
                className="p-4 bg-white shadow rounded-xl flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">
                    {item.name} {item.isVeg ? "🟢" : "🔴"}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.description}
                  </p>
                  <p className="font-medium mt-1">₹{item.price}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  {qty === 0 ? (
                    <button
                      onClick={() => addToCart(item)}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      ADD
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button onClick={() => decreaseQty(item.itemId)}>−</button>
                      <span>{qty}</span>
                      <button onClick={() => increaseQty(item.itemId)}>+</button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Restaurant;
