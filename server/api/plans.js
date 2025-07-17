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
    console.log("req.user:", req.user);
    console.log("req.params.plan_id:", req.params.plan_id);

    const user_id = parseInt(req.user);
    const plan_id = parseInt(req.params.plan_id);

    console.log("Parsed user_id:", user_id);
    console.log("Parsed plan_id:", plan_id);

    if (isNaN(user_id) || isNaN(plan_id)) {
      console.log("Invalid user_id or plan_id");
      return res.status(400).json({ error: "Invalid user or plan ID" });
    }

    console.log("About to query database...");

    const plan = await prisma.plan.findFirst({
      where: {
        id: plan_id,
      },
      select: {
        plan_type: true,
        plan_data: true,
        photos_first_destination: true,
        photos_second_destination: true,
        user_id: true,
        was_modified_first_destination: true,
        was_modified_second_destination: true,
      },
    });

    console.log("Database query completed, plan found:", !!plan);

    res.status(200).send({ plan });
  } catch (error) {
    console.error("Error in plan route:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Updates (PUT) image for first destination in DB
router.put("/update-first-image", verifyToken, async (req, res) => {
  try {
    const { planId, imageUrl } = req.body;

    // Function needs to update the entire plan, not just the
    const updatedImage = await prisma.plan.update({
      where: {
        id: planId,
      },
      data: {
        photos_first_destination: { push: imageUrl },
      },
    });

    return res.json({ success: true, updatedImage });
  } catch (error) {
    console.error("Error saving first image to DB", error);
    return res.status(500).json({ error: error.message });
  }
});

// Updates (PUT) image for second destination in DB
router.put("/update-second-image", verifyToken, async (req, res) => {
  try {
    const { planId, imageUrl } = req.body;

    // Function needs to update the entire plan, not just the
    const updatedImage = await prisma.plan.update({
      where: {
        id: planId,
      },
      data: {
        photos_second_destination: { push: imageUrl },
      },
    });

    return res.json({ success: true, updatedImage });
  } catch (error) {
    console.error("Error saving first image to DB", error);
    return res.status(500).json({ error: error.message });
  }
});

export default router;
