import React, { useState } from "react";

function FilterButton({showadd,setadd,Getalldata}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Main Button */}
      <button
        onClick={() => setShow(!show)}
        className="font-bold"
      >
        Filter
      </button>

      {/* Dropdown */}
      {show && (
        <div className="absolute mt-2 w-32 bg-white border rounded-lg shadow-lg flex flex-col">
          <button
          onClick={()=>{
            setadd(!showadd);
          }}  
          className="px-3 py-2 hover:bg-gray-100 text-left">Add</button>
         <button
         onClick={()=>Getalldata()}
         >Show All</button>
        </div>
      )}
    </div>
  );
}

export default FilterButton;
