const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const formRoutes = require("./routes/formRoutes");
// const userRoutes = require("./routes/userRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Updated CORS setup
const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/forms", formRoutes);
// app.use("/api/users", userRoutes);
app.use("/api/users", require("./routes/userRoutes"));

connectDB();

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
