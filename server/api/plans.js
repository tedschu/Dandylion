import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import { PrismaClient } from "../generated/prisma/client.ts";
import verifyToken from "../utilities/verifyToken.mjs";

const prisma = new PrismaClient();

// GET an invididual plan (already purchased)
// Accessed through "/me" page, by a plan creator or someone it's been shared with
router.get("/plans/:plan_id", verifyToken, async (req, res) => {
  try {
    const user_id = parseInt(req.user);
    const plan_id = parseInt(req.params.plan_id);
  } catch (error) {}
});

export default router;
