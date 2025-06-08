"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const categories = [
  "FASHION",
  "ELECTRONICS",
  "BAGS",
  "FOOTWEAR",
  "GROCERIES",
  "BEAUTY",
  "WELLNESS",
  "JEWELLERY",
];

const ScrollableTab = () => {
  const [active, setActive] = useState(0);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowLeft(el.scrollLeft > 0);
    setShowRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const distance = 250;
    scrollRef.current.scrollBy({
      left: dir === "left" ? -distance : distance,
      behavior: "auto",
    });
  };

  return (
    <div className="relative w-full overflow-hidden ">
      {/* Scroll Buttons */}
      {showLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2"
          aria-label="Scroll Left"
        >
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </button>
      )}
      {showRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2"
          aria-label="Scroll Right"
        >
          <ChevronRight className="w-5 h-5 text-gray-500" />
        </button>
      )}

      {/* Tabs */}
      <div
        ref={scrollRef}
        className="flex space-x-10 overflow-x-auto no-scrollbar px-3 py-3 scroll-smooth"
      >
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setActive(idx)}
            className={`relative text-base font-semibold uppercase px-2 transition-colors duration-200
              ${
                active === idx
                  ? "text-[#ff5252]"
                  : "text-gray-700 hover:text-[#ff5252]"
              }`}
            style={{ letterSpacing: "0.04em" }}
          >
            <span>{cat}</span>
            {active === idx && (
              <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#ff5252] rounded-full transition-all duration-200" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ScrollableTab;
