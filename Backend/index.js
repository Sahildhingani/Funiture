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


app.use((req, res, next) => {
  console.log("get a call on a backend ");
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  next();
});
// 
// ✅ Proper CORS config
const allowedOrigins = [
  "http://localhost:5173",
  "https://funiture-pi.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow Postman & server-to-server calls
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
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


app.use("/Admin", Router);
app.use("/User", UserRouter);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server Started at http://localhost:${process.env.PORT}`);
});
