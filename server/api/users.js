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
    const form_data = req.body.form_data;
    const user_id = parseInt(req.user);

    // create a new plan row
    const newPlan = await prisma.plan.create({
      data: {
        user_id: user_id,
        plan_type: plan_type,
        status: "DRAFT",
        result_data: result_data,
      },
    });

    const newUserResponse = await prisma.userResponse.create({
      data: {
        plan_id: newPlan.id,
        user_question_response_data: form_data,
      },
    });

    res.json({
      success: true,
      plan: newPlan,
      form_data: newUserResponse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// TODO: PUT update the plan row for id (plan id) and user_id to add the image S3 URLs

// GET to pull all trips for a given user (rendered on the "Me" page)
router.get("/my-plans", verifyToken, async (req, res) => {
  try {
    const allPlans = await prisma.plan.findMany({
      where: {
        user_id: parseInt(req.user),
      },
      orderBy: {
        id: "desc",
      },
      select: {
        plan_type: true,
        result_data: true,
        created_at: true,
      },
    });

    const plansFormattedDates = allPlans.map((plan) => ({
      plan_type: plan.plan_type,
      result_data: plan.result_data,
      created_at: plan.created_at.toLocaleString(),
    }));

    res.status(200).send({
      plansFormattedDates,
    });
    console.log(allPlans);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
