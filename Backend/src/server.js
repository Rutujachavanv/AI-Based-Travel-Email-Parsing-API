import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import parseEmailRoute from "./routes/parseEmail.route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", parseEmailRoute);

app.get("/", (req, res) => {
  res.send("Travel Email Parser API running");
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});