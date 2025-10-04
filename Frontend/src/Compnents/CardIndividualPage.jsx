import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Heart, ShoppingCart } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { Notify } from "../ContextApi/Context";
import { AddItemInWishList, AddToCardItem } from "../Redux/Slices";
import MostSellingSection from '../Compnents/ImageSliding';

function CardIndividualComponent() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [RelatedData, setRelatedData] = useState([]);
  const dispatch = useDispatch();
  const UserEmail = useSelector((s) => s.User.UserEmail);
  const { callNoti, dark } = useContext(Notify);
  const navigate = useNavigate();

  // Fetch individual product
  useEffect(() => {
    const GetTheProductData = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_API}/Admin/GetIndividualItem`,
          { params: { id } },{ withCredentials: true}
        );
        setProduct(data.data);
      } catch (error) {
        console.log(error);
      }
    };
    GetTheProductData();
  }, [id]);

  // Fetch related products
  useEffect(() => {
    const GetRelatedData = async (ProductCatogery) => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_API}/Admin/getitems`, {
          params: { page: 1, limit: 10, query: ProductCatogery }
        },{ withCredentials: true});
        setRelatedData(data.Data || []);
      } catch (error) {
        console.log(error);
      }
    };

    if (product?.ProductCatogery) {
      GetRelatedData(product.ProductCatogery);
    }
  }, [product]);

  const handleAddToCart = async () => {
    try {
      if (!UserEmail) return navigate("/Login");

      const { status } = await axios.post(`${import.meta.env.VITE_BACKEND_API}/User/AddtoCard`, {
        UserEmail,
        ProductId: id,
      },{ withCredentials: true});

      if (status === 200) {
        dispatch(AddToCardItem({ ProductId: id }));
        callNoti({ message: `${product.ProductName} Added to Cart`, type: "valid" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddWishList = async () => {
    try {
      if (!UserEmail) return navigate("/Login");

      const { status } = await axios.post(`${import.meta.env.VITE_BACKEND_API}/User/WishListAddItem`, {
        UserEmail,
        ProductId: id,
      },{ withCredentials: true});

      if (status === 200) {
        dispatch(AddItemInWishList({ ProductId: id }));
        callNoti({ message: `${product.ProductName} Added to Wishlist`, type: "valid" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return <p className={`text-center text-lg mt-10 ${dark ? "text-gray-300" : "text-gray-700"}`}>Loading product...</p>;
  }

  return (
    <div className={`max-w-7xl mx-auto p-6 ${dark ? "text-gray-200" : "text-gray-900"}`}>
      <div className={`rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-10 p-8 ${dark ? "bg-gray-800" : "bg-white"}`}>
        {/* Product Image */}
        <div className="w-full h-96 overflow-hidden rounded-2xl shadow-md">
          <img
            src={product.ProductImage}
            alt={product.ProductName}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
          />
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <h1 className={`text-4xl font-extrabold ${dark ? "text-gray-100" : "text-gray-900"}`}>{product.ProductName}</h1>
              {product.MostSelling && (
                <span className="bg-yellow-400 text-white text-sm font-semibold px-4 py-1 rounded-full shadow-lg">
                  ⭐ Most Selling
                </span>
              )}
            </div>
            <p className={`mb-6 text-lg leading-relaxed ${dark ? "text-gray-300" : "text-gray-700"}`}>{product.ProductDesc}</p>

            <div className="space-y-2 text-lg">
              <p><span className="font-semibold">Brand:</span> {product.ProductBrand}</p>
              <p><span className="font-semibold">Category:</span> {product.ProductCatogery}</p>
            </div>
          </div>

          {/* Price & Actions */}
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-3xl font-bold text-green-600">₹{product.ProductPrice}</p>

            <div className="flex gap-4 flex-wrap">
              <button
                onClick={handleAddToCart}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition shadow-lg ${
                  dark
                    ? "bg-blue-700 hover:bg-blue-800 text-white"
                    : "bg-blue-600 hover:bg-blue-700 text-white"
                }`}
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
              <button
                onClick={handleAddWishList}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition shadow-sm ${
                  dark
                    ? "border border-gray-600 hover:bg-gray-700 text-gray-200"
                    : "border border-gray-300 hover:bg-gray-100 text-gray-700"
                }`}
              >
                <Heart size={20} className="text-red-500" /> Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {RelatedData.length > 0 && (
        <div className="mt-12">
          <h2 className={`text-3xl font-bold mb-6 ${dark ? "text-gray-100" : "text-gray-900"}`}>Related Products</h2>
          <MostSellingSection MostSellingItems={RelatedData} dark={dark} />
        </div>
      )}
    </div>
  );
}

export default CardIndividualComponent;
