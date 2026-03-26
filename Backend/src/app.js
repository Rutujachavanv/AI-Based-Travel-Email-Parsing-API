import express from "express";
import cors from "cors";
import parseEmailRoute from "./routes/parseEmail.route.js";

const app = express();

// Middleware
app.use(cors());          // 🔥 ADD THIS LINE
app.use(express.json());

// Routes
app.use("/api", parseEmailRoute);

// Health check
app.get("/", (req, res) => {
  res.send("Travel Email Parser API is running");
});

export default app;
