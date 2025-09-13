import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import UAbox from "./Add/Update";
import axios from "axios";
import Switch from "@mui/material/Switch";

function ShowComponent({
  ProductDesc,
  ProductName,
  ProductPrice,
  ProductCatogery,
  ProductBrand,
  ProductId,
  ProductImage,
  onDelete,
  GetallData,
  TopRated,
  MostSelling,
}) {
  const [UpdateShow, setUpdate] = useState(false);

  // update data
  const UpdateData = async ({
    ProductName,
    ProductDesc,
    ProductPrice,
    ProductCatogery,
    ProductBrand,
    ProductId,
    TopRated,
    MostSelling,
  }) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_API}/Admin/Update`, {
        ProductName,
        ProductDesc,
        ProductBrand,
        ProductCatogery,
        ProductPrice,
        ProductId,
        TopRated,
        MostSelling,
      });

      if (data) {
        alert("Data updated successfully ✅");
        GetallData();
      }
    } catch (error) {
      console.error("Issue in data update ", error);
      alert("❌ Issue while updating data");
    }
  };

  return (
    <>
      {UpdateShow && (
        <UAbox
          ProductId={ProductId}
          ProductName={ProductName}
          ProductDesc={ProductDesc}
          ProductPrice={ProductPrice}
          ProductBrand={ProductBrand}
          ProductCatogery={ProductCatogery}
          ProductImage={ProductImage}
          onUpdate={UpdateData}
        />
      )}

      <div className="flex justify-between px-4 items-center w-full py-3 border-b transition hover:bg-gray-50 bg-white">
        {/* Product Image */}
        <img
          src={ProductImage}
          alt={ProductName}
          className="w-20 h-20 object-cover rounded-lg"
        />

        {/* Product Name */}
        <p className="font-medium text-gray-800">{ProductName}</p>

        {/* Product Description */}
        <p
          className="text-gray-600 truncate max-w-[200px] overflow-hidden whitespace-nowrap"
          title={ProductDesc || "No description available"}
        >
          {ProductDesc}
        </p>

        {/* Product Price */}
        <p className="text-blue-600 font-semibold">₹ {ProductPrice}</p>

        {/* Brand & Category */}
        <p className="text-gray-700">{ProductBrand}</p>
        <p className="text-gray-700">{ProductCatogery}</p>

        {/* Switches */}
        <Switch
          checked={TopRated}
          onChange={(e) =>
            UpdateData({
              ProductName,
              ProductDesc,
              ProductBrand,
              ProductCatogery,
              ProductPrice,
              ProductId,
              TopRated: e.target.checked,
              MostSelling,
            })
          }
          inputProps={{ "aria-label": "Top Rated Switch" }}
        />

        <Switch
          checked={MostSelling}
          onChange={(e) =>
            UpdateData({
              ProductName,
              ProductDesc,
              ProductBrand,
              ProductCatogery,
              ProductPrice,
              ProductId,
              TopRated,
              MostSelling: e.target.checked,
            })
          }
          inputProps={{ "aria-label": "Most Selling Switch" }}
        />

        {/* Actions */}
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => setUpdate(!UpdateShow)}
            className="text-blue-500 hover:text-blue-700 transition"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => onDelete(ProductId)}
            className="text-red-500 hover:text-red-700 transition"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </>
  );
}

export default ShowComponent;
