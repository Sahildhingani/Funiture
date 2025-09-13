import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../App.css";
import AdminNav from "./AdminNav";

function Admin() {
  return (
    <div className="h-screen w-screen flex flex-col md:flex-row">
      {/* Nav */}
      <div className="w-full md:w-52">
        <AdminNav />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto p-4 bg-gray-50">
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;


