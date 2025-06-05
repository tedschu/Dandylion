import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import { PrismaClient } from "../generated/prisma/client.ts";
import verifyToken from "../utilities/verifyToken.mjs";

const prisma = new PrismaClient();

// POST a new plan (Plan) and responses / questions (UserResponse) when the Anthropic API returns data
router.post("/plan", verifyToken, async (req, res) => {
  try {
    const result_data = req.body.result_data;
    const plan_type = req.body.plan_type;
    const user_id = parseInt(req.user);

    res.json({
      success: true,
      message: "data received",
      //   data: { user_id, result_data, plan_type },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT update the plan row for id (plan id) and user_id to add the image S3 URLs

export default router;
