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

// ✅ Allowed origins
const allowedOrigins = [
  "http://localhost:5173",
  "https://funiture-pi.vercel.app"
];

// ✅ Proper CORS setup
app.use(cors({
  origin: function (origin, callback) {
    console.log("Origin trying to access backend:", origin);

    // Allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(null, false); // don’t throw error, just reject
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// // ✅ Handle preflight requests
// app.options("*", (req, res) => {
//   res.sendStatus(200);
// });

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_SECRET)
  .then(() => console.log("Mongodb Connected Successfully"))
  .catch((err) => console.log("MongoDb error", err));

// Routers
app.use("/Admin", Router);
app.use("/User", UserRouter);

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server Started at http://localhost:${process.env.PORT}`);
});

