import React, { useEffect, useState } from "react";
import HomeCatogery from "../Compnents/HomeCatogeryLinks";
import axios from "axios";
import FilterSidebar from "../Compnents/Filter";
import Card from "../Compnents/ProductCard";
import banner from "../images/Tables.png";

function Table() {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // fetch data
  async function Gettheitem(pageNo) {
    try {
      const resp = await axios.get(`${import.meta.env.VITE_BACKEND_API}/Admin/getitems`, {
        params: {
          ProductCatogery: "Table",
          page: pageNo,
          limit: 6,
        },
      });

      if (resp) {
        if (pageNo === 1) {
          setAllData(resp.data.Data);
          setFilteredData(resp.data.Data);
        } else {
          setAllData((prev) => [...prev, ...resp.data.Data]);
          setFilteredData((prev) => [...prev, ...resp.data.Data]);
        }
        setHasMore(resp.data.hasMore);
      }
    } catch (error) {
      console.log("table page error", error);
    }
  }

  useEffect(() => {
    Gettheitem(1);
  }, []);

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    Gettheitem(nextPage);
  };

  return (
    <div className="flex flex-col">
      <HomeCatogery />

      {/* Banner */}
      <div className="flex justify-center items-center relative px-4 sm:px-6">
              <img
                className="h-96 w-7xl rounded-4xl mt-15 object-cover"
                src={banner}
                alt="Sofa Banner"
              />
              <h1 className="absolute inset-0 flex justify-center items-center text-white text-4xl font-bold">
                Tables
              </h1>
            </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-5 p-4 sm:p-8">
        {/* Sidebar */}
        <div className="md:sticky md:top-20 md:h-fit md:self-start w-full md:w-1/4">
          <FilterSidebar array={allData} setarray={setFilteredData} />
        </div>

        {/* Display Section */}
        <div className="flex flex-col w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredData.map((e, i) => (
              <Card
                id={e.ProductId}
                key={i}
                name={e.ProductName}
                desc={e.ProductDesc}
                price={e.ProductPrice}
                brand={e.ProductBrand}
                img={e.ProductImage}
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <button
              onClick={loadMore}
              className="mt-6 mx-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Table;
