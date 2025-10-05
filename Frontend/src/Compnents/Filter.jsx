import React, { useState, useMemo, useEffect, useContext } from "react";
import { Filter, X } from "lucide-react";
import { Range } from "react-range";
import { Notify } from "../ContextApi/Context";

function FilterSidebar({ array = [], setarray, layout = "vertical" }) {
  const [price, setPrice] = useState([0, 10000]); // [min, max]
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [onlyTopRated, setOnlyTopRated] = useState(false);
  const [onlyMostSelling, setOnlyMostSelling] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const { dark } = useContext(Notify);

  const MIN_PRICE = 0;
  const MAX_PRICE = 10000;

  // Compute unique brands
  const brands = useMemo(() => {
    return [
      ...new Set(
        array
          .map(
            (item) =>
              item?.ProductBrand || item?.productBrand || item?.brand || null
          )
          .filter(Boolean)
      ),
    ];
  }, [array]);

  // Filter items whenever filters change
  useEffect(() => {
    if (!Array.isArray(array)) return;
    let filtered = [...array];

    if (selectedBrand) {
      filtered = filtered.filter(
        (item) =>
          item.ProductBrand === selectedBrand ||
          item.productBrand === selectedBrand ||
          item.brand === selectedBrand
      );
    }

    filtered = filtered.filter((item) => {
      const numericPrice = Number(
        String(item.ProductPrice || item.productPrice || 0).replace(/,/g, "")
      );
      return numericPrice >= price[0] && numericPrice <= price[1];
    });

    if (onlyTopRated) {
      filtered = filtered.filter((item) => item.TopRated || item.topRated);
    }

    if (onlyMostSelling) {
      filtered = filtered.filter((item) => item.MostSelling || item.mostSelling);
    }

    setarray(filtered);
  }, [array, selectedBrand, price, onlyTopRated, onlyMostSelling, setarray]);

  // Layout classes
  const containerClass = `${
    layout === "horizontal"
      ? "flex flex-wrap gap-4 p-4 rounded-2xl items-center justify-start"
      : "w-72 p-6 rounded-2xl space-y-6"
  } ${dark ? "bg-gray-800 shadow-gray-700" : "bg-white shadow-gray-300 shadow"}`;

  // Filter content JSX
  const FilterContent = (
    <div className={containerClass}>
      {/* Price Filter */}
      <div>
        <h2
          className={`font-semibold mb-2 text-sm ${
            dark ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Price
        </h2>
        <div className="px-2 py-4">
          <Range
            step={500}
            min={MIN_PRICE}
            max={MAX_PRICE}
            values={price}
            onChange={(values) => setPrice(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                className="h-2 w-full rounded bg-gray-300 relative"
              >
                <div
                  className="absolute h-2 bg-teal-500 rounded"
                  style={{
                    left: `${((price[0] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                    right: `${100 - ((price[1] - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) * 100}%`,
                  }}
                />
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                className="w-4 h-4 bg-white border border-teal-500 rounded-full shadow"
              />
            )}
          />
          <p
            className={`text-xs mt-2 ${
              dark ? "text-gray-300" : "text-gray-600"
            }`}
          >
            ₹{price[0]} - ₹{price[1]}
          </p>
        </div>
      </div>

      {/* Brand Filter */}
      <div>
        <h2
          className={`font-semibold mb-2 text-sm ${
            dark ? "text-gray-200" : "text-gray-800"
          }`}
        >
          Brand
        </h2>
        <div
          className={
            layout === "horizontal" ? "flex gap-2 flex-wrap" : "grid grid-cols-2 gap-2"
          }
        >
          {brands.length > 0 ? (
            brands.map((brand) => (
              <button
                key={brand}
                onClick={() =>
                  setSelectedBrand((prev) => (prev === brand ? null : brand))
                }
                className={`px-3 py-1 border rounded-lg text-xs ${
                  selectedBrand === brand
                    ? dark
                      ? "border-teal-400 bg-gray-700 text-white"
                      : "border-black bg-gray-50"
                    : dark
                    ? "border-gray-600 text-gray-200"
                    : "border-gray-200 text-gray-800"
                }`}
              >
                {brand}
              </button>
            ))
          ) : (
            <p
              className={`text-xs ${
                dark ? "text-gray-400" : "text-gray-500"
              }`}
            >
              No brands
            </p>
          )}
        </div>
      </div>

      {/* Toggles */}
      <div className="space-y-2 text-sm">
        <label
          className={`flex items-center gap-2 cursor-pointer ${
            dark ? "text-gray-200" : ""
          }`}
        >
          <input
            type="checkbox"
            checked={onlyTopRated}
            onChange={() => setOnlyTopRated((prev) => !prev)}
          />
          <span>Top Rated</span>
        </label>

        <label
          className={`flex items-center gap-2 cursor-pointer ${
            dark ? "text-gray-200" : ""
          }`}
        >
          <input
            type="checkbox"
            checked={onlyMostSelling}
            onChange={() => setOnlyMostSelling((prev) => !prev)}
          />
          <span>Most Selling</span>
        </label>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile filter button */}
      <div className="md:hidden flex justify-end mb-4 px-4">
        <button
          onClick={() => setOpenMobile(true)}
          className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm shadow ${
            dark
              ? "bg-gray-700 border-gray-600 text-gray-200"
              : "bg-white border-gray-300 text-gray-800"
          }`}
        >
          <Filter className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Sidebar (desktop only) */}
      <div className="hidden md:block">{FilterContent}</div>

      {/* Mobile Drawer */}
      {openMobile && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
          <div
            className={`${
              dark
                ? "bg-gray-900 text-gray-200"
                : "bg-white text-gray-900"
            } w-72 h-full shadow-lg p-6 overflow-y-auto`}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg">Filters</h2>
              <button onClick={() => setOpenMobile(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>
            {FilterContent}
          </div>
        </div>
      )}
    </>
  );
}

export default FilterSidebar;
