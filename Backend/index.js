const dotenv = require("dotenv");
dotenv.config(); 

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

// Environment variables
const PORTNUMB = process.env.PORT || 5000;
console.log("PORT:", PORTNUMB);
console.log("Mongo URI:", process.env.MONGODB_SECRET);

// Routers
const Router = require("./Admin_Router/ProductRouter");
const UserRouter = require('./UserRouter/Router');

// Middlewares
app.use(cors({
  origin: process.env.VITE_API, // your frontend port (Vite runs on 5173)
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_SECRET)
  .then(() => console.log("Mongodb Connected Successfully"))
  .catch((err) => console.log("MongoDb error", err));

// Routes
app.use("/Admin", Router);
app.use("/User", UserRouter);

// Start server
app.listen(PORTNUMB, () => {
  console.log(`Server Started at http://localhost:${PORTNUMB}`);
});
