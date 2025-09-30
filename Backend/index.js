const dotenv = require("dotenv");
dotenv.config(); 

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

const app = express();

console.log("Mongo URI:", process.env.MONGODB_SECRET);

// Routers
const Router = require("./Admin_Router/ProductRouter");
const UserRouter = require('./UserRouter/Router');

// ✅ Security headers (relaxed for popups)
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "unsafe-none");
  next();
});

// ✅ Proper CORS config
app.use(cors({
  origin: [
    "http://localhost:5173",         // local dev
    "https://funiture-psi.vercel.app/Shop"    // deployed frontend
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Middlewares
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
app.listen(process.env.PORT, () => {
  console.log(`Server Started at http://localhost:${process.env.PORT}`);
});
