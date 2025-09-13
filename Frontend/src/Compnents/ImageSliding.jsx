import React, { useRef, useState, useEffect, useContext } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Card from "./ProductCard";
import { Notify } from "../ContextApi/Context";

export default function MostSellingSection({ MostSellingItems }) {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const { dark } = useContext(Notify);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = scrollRef.current.clientWidth * 0.8; // Scroll 80% of container width
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    currentRef?.addEventListener("scroll", checkScrollPosition);

    // Initial check
    checkScrollPosition();

    // Handle window resize
    const handleResize = () => checkScrollPosition();
    window.addEventListener("resize", handleResize);

    return () => {
      currentRef?.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if (!MostSellingItems?.length) return null;

  return (
    <div className="relative w-full mx-auto group">
      {/* Left Arrow */}
      <button
        onClick={() => scroll("left")}
        className={`absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition-all duration-200 z-10 md:p-3 md:left-4
          ${showLeftArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          ${dark ? 'bg-gray-800 border border-gray-600 hover:bg-gray-700' : 'bg-white border border-gray-200 hover:bg-gray-100'}
        `}
        aria-label="Scroll left"
      >
        <ChevronLeft size={24} className={dark ? "text-gray-100" : "text-gray-700"} />
      </button>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto scrollbar-hide scroll-smooth px-4 gap-4 py-4 md:px-8 md:gap-6"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {MostSellingItems.map((e) => (
          <div 
            key={e.ProductId} 
            className="flex-shrink-0 w-48 transition-transform hover:scale-105 md:w-60 lg:w-72"
          >
            <Card
              id={e.ProductId}
              name={e.ProductName}
              desc={e.ProductDesc}
              price={e.ProductPrice}
              brand={e.ProductBrand}
              img={e.ProductImage}
              dark={dark} // pass dark prop if Card also supports dark mode
            />
          </div>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        onClick={() => scroll("right")}
        className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full shadow-lg transition-all duration-200 z-10 md:p-3 md:right-4
          ${showRightArrow ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          ${dark ? 'bg-gray-800 border border-gray-600 hover:bg-gray-700' : 'bg-white border border-gray-200 hover:bg-gray-100'}
        `}
        aria-label="Scroll right"
      >
        <ChevronRight size={24} className={dark ? "text-gray-100" : "text-gray-700"} />
      </button>
    </div>
  );
}
