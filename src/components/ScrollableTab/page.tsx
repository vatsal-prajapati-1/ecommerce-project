"use client";

import { useState, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  "ELECTRONICS",
  "BAGS",
  "FOOTWEAR",
  "GROCERIES",
  "BEAUTY",
  "WELLNESS",
  "JEWELLERY",
  "BASIC",
];

const ScrollableTab = () => {
  const [active, setActive] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const distance = 200;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -distance : distance,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full overflow-hidden border-b border-gray-200">
      {/* Scroll Buttons */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2"
        aria-label="Scroll Left"
      >
        <ChevronLeft className="w-5 h-5 text-gray-500" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2"
        aria-label="Scroll Right"
      >
        <ChevronRight className="w-5 h-5 text-gray-500" />
      </button>

      {/* Tabs */}
      <div
        ref={scrollRef}
        className="flex space-x-10 overflow-x-auto no-scrollbar px-8 py-3 scroll-smooth"
      >
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className="relative text-sm font-medium uppercase text-gray-700"
          >
            <span>{cat}</span>
            {active === idx && (
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-red-500 rounded-full" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScrollableTab;
