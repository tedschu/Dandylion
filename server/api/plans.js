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

    const plan = await prisma.plan.findFirst({
      where: {
        id: plan_id,
      },
      select: {
        plan_type: true,
        plan_data: true,
        photos_first_destination: true,
        photos_second_destination: true,
      },
    });

    res.status(200).send({ plan });
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

// FINISH THIS, just need to add image url to Photos array
router.put("/update-first-image", verifyToken, async (req, res) => {
  try {
    const { planId, imageUrl } = req.body;

    // Function needs to update the entire plan, not just the
    const updatedImage = await prisma.plan.update({
      where: {
        id: planId,
      },
      data: {
        photos: { push: imageUrl },
      },
    });

    res.json({ success: true, updatedImage });
  } catch (error) {
    console.error("Error saving first image to DB", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
