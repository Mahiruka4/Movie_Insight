"use client"
import { useState } from "react";

export default function MovieOverview({ overview }: { overview: string }) {
  const [showFullOverview, setShowFullOverview] = useState(false);
  const toggleShowMore = () => {
    setShowFullOverview(!showFullOverview);
  };

  return (
    <div className="p-8 bg-gradient-to-t from-black via-transparent to-transparent">
      <h2 className="text-3xl font-bold mb-4">Overview</h2>
      <p className="text-gray-300">
        {showFullOverview ? overview : `${overview.slice(0, 150)}...`}
      </p>
      <button
        className="text-blue-500 underline cursor-pointer"
        onClick={toggleShowMore}
      >
        {showFullOverview ? "Show Less" : "Show More"}
      </button>
    </div>
  );
}
