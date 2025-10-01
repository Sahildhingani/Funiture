import React, { useContext, useEffect, useState } from "react";
import Card from "./ProductCard";
import axios from "axios";
import FilterSidebar from "./Filter";
import { Search, X } from "lucide-react"; 
import { Notify } from "../ContextApi/Context";

function Shop() {
  const [ProductData, setData] = useState([]);
  const [FilteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [search, setSearch] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);

  const { dark } = useContext(Notify);

  async function GetProductData(currentPage = 1, query = "") {
    try {
      setLoading(true);
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_API}/Admin/getitems`, {
        params: { page: currentPage, limit: 10, query },
         withCredentials: true,
      });

      const newData = res.data.Data;

      if (currentPage === 1) {
        setData(newData);
        setFilteredData(newData);
      } else {
        setData((prev) => [...prev, ...newData]);
        setFilteredData((prev) => [...prev, ...newData]);
      }

      setHasMore(res.data.hasMore);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    GetProductData(page, search);
  }, [page]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);

    if (debounceTimer) clearTimeout(debounceTimer);

    setDebounceTimer(
      setTimeout(() => {
        setPage(1);
        GetProductData(1, value);
      }, 700)
    );
  };

  const clearSearch = () => {
    setSearch("");
    setPage(1);
    GetProductData(1, "");
  };

  const handleLoadMore = () => {
    if (hasMore) setPage((prev) => prev + 1);
  };

  return (
    <div className={`flex flex-col md:flex-row gap-6 p-4 ${dark ? "bg-gray-900 text-gray-200" : "bg-white text-gray-900"}`}>
      {/* Filter Sidebar */}
      <div className="w-full md:w-1/4 lg:w-1/5">
        <FilterSidebar
          array={ProductData}
          setarray={setFilteredData}
          layout="vertical"
          dark={dark} // pass dark prop if needed inside FilterSidebar
        />
      </div>

      {/* Right Section (Search + Products) */}
      <div className="w-full md:w-3/4 lg:w-4/5">
        {/* Search Bar */}
        <div className="mb-6 relative">
          <Search className={`${dark ? "text-gray-400" : "text-gray-400"} absolute left-3 top-3 w-5 h-5`} />
          <input
            type="text"
            value={search}
            onChange={handleSearch}
            placeholder="Search products..."
            className={`w-full pl-10 pr-10 py-2 rounded-full focus:outline-none focus:ring-2 transition
              ${dark 
                ? "bg-gray-800 border-gray-700 text-gray-200 placeholder-gray-400 focus:ring-teal-500 focus:border-teal-500" 
                : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500"}`}
          />
          {search && (
            <button
              onClick={clearSearch}
              className={`absolute right-3 top-2 ${dark ? "text-gray-300 hover:text-white" : "text-gray-500 hover:text-gray-700"}`}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {loading && page === 1 ? (
          <p className="text-center text-lg font-semibold">Loading products...</p>
        ) : FilteredData.length === 0 ? (
          <p className="text-center text-lg font-semibold">No products found</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {FilteredData.map((item) => (
                <Card
                  key={item.ProductId}
                  id={item.ProductId}
                  name={item.ProductName}
                  desc={item.ProductDesc}
                  price={item.ProductPrice}
                  brand={item.ProductBrand}
                  img={item.ProductImage}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-6">
                <button
                  onClick={handleLoadMore}
                  className={`px-6 py-2 rounded-full shadow-md transition
                    ${dark 
                      ? "bg-teal-700 hover:bg-teal-800 text-white" 
                      : "bg-blue-600 hover:bg-blue-700 text-white"}`}
                  disabled={loading}
                >
                  {loading ? "Loading..." : "Load More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Shop;

