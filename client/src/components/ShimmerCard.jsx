// components/ShimmerCard.jsx
import React from "react";

const ShimmerCard = () => {
  return (
    <div className="relative overflow-hidden border-2 border-gray-200 rounded-lg">
      {/* Shine effect wrapper */}
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

      {/* Content skeleton */}
      <div className="bg-gray-200 h-60 w-full"></div>

      <div className="p-3 space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    </div>
  );
};

export default ShimmerCard;
