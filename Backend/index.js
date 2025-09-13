const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path"); // ✅ Add this
const app = express();
const PORT = 5000;
const Router = require("./Admin_Router/ProductRouter");
const UserRouter=require('./UserRouter/Router');
const cookieParser = require("cookie-parser");
const dotenv=require('dotenv'); 
// const uploadFile = require("./upload");
// middlewares
app.use(cors({
  origin: process.env.VITE_API, // your frontend port (Vite runs on 5173)
  credentials: true,               // allow cookies
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
mongoose
  .connect(process.env.MONGODB_SECRET)
  .then(() => {
    console.log("Mongodb Connected Successfully");
     const User = require("./Model/UserModel");
  })
  .catch((err) => {
    console.log("MongoDb error", err);
  });
app.use("/Admin", Router);
app.use('/User',UserRouter);
app.listen(PORT, () => {
  console.log(`Server Started at http://localhost:${PORT}`);
});
