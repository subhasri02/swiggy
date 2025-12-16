

import React from "react";
import { useNavigate } from "react-router-dom";

const RestaurantCard = ({ restaurant }) => {
  const navigate = useNavigate();
  const { id, name, cuisines, avgRatingString, cloudinaryImageId, sla, costForTwo } =
    restaurant.info;

  const handleClick = () => {
    navigate(`/restaurant/${id}`);
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-transparent hover:border-orange-100"
    >
      {/* Image */}
      <div className="relative">
        <img
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_500/${cloudinaryImageId}`}
          alt={name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent"></div>

        {/* Rating badge */}
        <div className="absolute bottom-2 left-2 bg-white/90 text-orange-600 text-sm font-semibold px-2 py-1 rounded-md shadow-sm">
          ⭐ {avgRatingString || "N/A"}
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 truncate">{name}</h3>
        <p className="text-gray-500 text-sm truncate">
          {cuisines.slice(0, 3).join(", ")}
        </p>

        <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
          <span>{costForTwo || "₹₹"}</span>
          <span className="text-orange-500 font-medium">{sla?.slaString}</span>
        </div>
      </div>
    </div>
  );
};

export default RestaurantCard;
