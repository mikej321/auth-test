const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const authenticateMiddleware = require("./middleware/authenticateJWT");

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Serve the static files from the react build
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// Catch-all route for React (for React Router)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
});

// Login route becomes POST /auth/login
app.use("/auth", authRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
