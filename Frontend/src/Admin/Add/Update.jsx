import React from "react";
import { useState } from "react";
function UAbox({ProductName,ProductDesc,ProductPrice,ProductCatogery,ProductBrand,onUpdate,ProductId}){
    const [Name, setName] = useState(ProductName);
    const [Desc, setDesc] = useState(ProductDesc);
    const [Price, setPrice] = useState(ProductPrice);
    const [Brand, setBrand] = useState(ProductBrand);
    const [Catogery, setCatogery] = useState(ProductCatogery);
    return (
        <>
        <div className="flex flex-col gap-4 p-6 bg-white shadow-lg rounded-xl w-11/12 mx-auto mt-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <input
              type="text"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              value={Desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Description"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              value={Brand}
              onChange={(e) => setBrand(e.target.value)}
              placeholder="Brand"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              value={Catogery}
              onChange={(e) => setCatogery(e.target.value)}
              placeholder="Category"
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
             <button
             onClick={()=>onUpdate({ProductName:Name,ProductDesc:Desc,ProductPrice:Price,ProductBrand:Brand,ProductCatogery:Catogery,ProductId:ProductId})}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition"
            >
              Update
            </button>
          </div>
        </div>
        </>
    )
}

export default UAbox;