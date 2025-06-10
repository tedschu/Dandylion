import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import { PrismaClient } from "../generated/prisma/client.ts";
import verifyToken from "../utilities/verifyToken.mjs";

const prisma = new PrismaClient();

// GET an invididual plan (already purchased)
// Accessed through "/me" page, by a plan creator or someone it's been shared with
router.get("/:plan_id", verifyToken, async (req, res) => {
  try {
    console.log("hitting plan route");
    const user_id = parseInt(req.user);
    const plan_id = parseInt(req.params.plan_id);

    const planData = await prisma.plan.findFirst({
      where: {
        id: plan_id,
      },
      select: {
        plan_type: true,
        result_data: true,
      },
    });

    res.status(200).send({ planData });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

export default router;
