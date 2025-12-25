require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./config/db");

// Load models BEFORE routes
const User = require("./models/User");
const Post = require("./models/Post");

const authRoutes = require("./routes/auth.routers");
const userRoutes = require("./routes/user.routes");

const app = express();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const corsOptions = {
  origin: FRONTEND_URL,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);

const PORT = process.env.PORT || 5000;

sequelize.sync({ alter: true }).then(() => {
  app.listen(PORT, () => {
    console.log("✅ Server running on port", PORT);
    console.log("✅ CORS enabled for", FRONTEND_URL);
  });
}).catch(err => {
  console.error("❌ Database sync error:", err.message);
  process.exit(1);
});
