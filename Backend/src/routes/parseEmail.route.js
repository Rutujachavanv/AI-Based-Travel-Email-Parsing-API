import express from "express";
import { parseEmailWithAI } from "../services/openai.service.js";

const router = express.Router();

router.post("/parse-email", async (req, res) => {

  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        error: "Email text required"
      });
    }

    const result = await parseEmailWithAI(email);

    res.json(result);

  } catch (error) {

    res.status(500).json({
      error: "AI parsing failed"
    });

  }

});

export default router;