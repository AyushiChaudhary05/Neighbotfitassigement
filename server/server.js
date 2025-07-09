const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const app = express();

console.log("MONGO_URI:", process.env.MONGO_URI); 

const allowedOrigins = [
  "https://neighborfit.vercel.app",
  "https://neighborfit-4.vercel.app",
  "https://neighborfit-i78x.vercel.app",
  "https://neighbotfitassigement.vercel.app",  
  "http://localhost:3000" 
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../client/public")));

// Route Imports
const authRoutes = require("./routes/auth");
const matchRoutes = require("./routes/match");

// Mount routes
app.use("/api/auth", authRoutes);     
app.use("/api", matchRoutes);  

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.error("MongoDB Connection Error:", err));
