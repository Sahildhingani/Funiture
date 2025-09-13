import React, { useEffect, useState } from "react";
import "../App.css";
import axios from "axios";
import FilterButton from "./FilterButtonAdmin";
import ShowComponent from "./ProductComponent";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as filestack from "filestack-js";

const client = filestack.init(import.meta.env.VITE_FILESTACK_API);

function Product() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(""); // Filestack URL
  const [showAdd, setShowAdd] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const userEmail = useSelector((s) => s.User.UserEmail);

  // Fetch products
  const getAllData = async (page = 1, append = false) => {
    setIsLoading(true);
    try {
      const resp = await axios.get(
        `${import.meta.env.VITE_BACKEND_API}/Admin/getitems?page=${page}&limit=10`
      );
      if (resp) {
        if (append) {
          setProducts((prev) => [...prev, ...resp.data.Data]);
        } else {
          setProducts(resp.data.Data);
        }
        setHasMore(resp.data.hasMore);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Data fetch error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    getAllData(currentPage + 1, true);
  };

  // Delete product
  const deleteItems = async (productId) => {
    try {
      const resp = await axios.delete(`${import.meta.env.VITE_BACKEND_API}/Admin/remove`, {
        data: { ProductId: productId },
      });
      if (resp) {
        console.log("Item deleted from database");
        getAllData(1, false);
      }
    } catch (error) {
      console.error("Delete item error:", error);
    }
  };

  // Filestack upload
  const handleUpload = () => {
    client.picker({
      accept: ["image/*"],
      maxFiles: 1,
      onUploadDone: (res) => {
        try {
          const url = res.filesUploaded[0].url;
          console.log("Image uploaded successfully:", url);
          setImage(url); // save URL
        } catch (err) {
          console.error("Error reading uploaded file:", err);
        }
      },
      onFileUploadFailed: (file, error) => {
        console.error("File upload failed:", file, error);
      },
    }).open();
  };

  // Add product
  const handleSubmit = async () => {
    if (!image) {
      alert("Please upload an image!");
      return;
    }

    try {
      const resp = await axios.post(`${import.meta.env.VITE_BACKEND_API}/Admin/Add`, {
        ProductName: name,
        ProductDesc: desc,
        ProductPrice: price,
        ProductBrand: brand,
        ProductCategory: category,
        ProductImage: image, // send URL only
      });

      console.log(resp.data);
      alert("Product added successfully!");
      setName("");
      setDesc("");
      setPrice("");
      setBrand("");
      setCategory("");
      setImage("");
      setShowAdd(false);
      getAllData(1, false);
    } catch (error) {
      console.error("Error uploading product:", error);
      alert("Error uploading product!");
    }
  };

  useEffect(() => {
    getAllData(1, false);
  }, []);

  return (
    <div className="h-screen w-screen bg-gray-50 overflow-scroll">
      {/* Header */}
      <div className="flex justify-evenly bg-gray-200 h-12 items-center px-4 shadow-md">
        <h1 className="text-gray-700 font-semibold">Image</h1>
        <h1 className="text-gray-700 font-semibold">Name</h1>
        <h1 className="text-gray-700 font-semibold">Description</h1>
        <h1 className="text-gray-700 font-semibold">Price</h1>
        <h1 className="text-gray-700 font-semibold">Brand</h1>
        <h1 className="text-gray-700 font-semibold">Category</h1>
        <h1 className="text-gray-700 font-semibold">TopRated</h1>
        <h1 className="text-gray-700 font-semibold">MostSelling</h1>
        <FilterButton
          showadd={showAdd}
          setadd={setShowAdd}
          Getalldata={() => getAllData(1, false)}
        />
      </div>

      {/* Add Product Form */}
      {showAdd && (
        <div className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-xl w-11/12 mx-auto mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Description"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Brand"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="Category"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            <button
              type="button"
              onClick={handleUpload}
              className="bg-green-500 text-white px-3 py-2 rounded-lg shadow hover:bg-green-600 transition"
            >
              Upload Image
            </button>
          </div>

          {image && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Preview:</p>
              <img src={image} alt="preview" className="w-28 h-28 object-cover mt-1" />
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
            >
              Add
            </button>
          </div>
        </div>
      )}

      {/* Product List */}
      <div>
        {products.length > 0 &&
          products.map((e) => (
            <ShowComponent
              key={e.ProductId}
              ProductDesc={e.ProductDesc}
              ProductName={e.ProductName}
              ProductPrice={e.ProductPrice}
              ProductCategory={e.ProductCategory}
              ProductBrand={e.ProductBrand}
              ProductId={e.ProductId}
              onDelete={deleteItems}
              ProductImage={e.ProductImage}
              GetallData={() => getAllData(1, false)}
              TopRated={e.TopRated}
              MostSelling={e.MostSelling}
            />
          ))}
      </div>

      {/* Load More Button */}
      {hasMore && (
        <div className="flex justify-center my-6">
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition disabled:opacity-50"
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
}

export default Product;
