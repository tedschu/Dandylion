import express from "express";
const router = express.Router();
import jwt from "jsonwebtoken";
import { PrismaClient } from "../generated/prisma/client.ts";
import verifyToken from "../utilities/verifyToken.mjs";
import { verify } from "crypto";

const prisma = new PrismaClient();

// POST a new plan (Plan) and responses / questions (UserResponse) when the Anthropic API returns data
router.post("/plan", verifyToken, async (req, res) => {
  try {
    const plan_data = req.body.plan_data;
    const plan_type = req.body.plan_type;
    const form_data = req.body.form_data;
    const user_id = parseInt(req.user);

    // create a new plan row
    const newPlan = await prisma.plan.create({
      data: {
        user_id: user_id,
        plan_type: plan_type,
        status: "DRAFT",
        plan_data: plan_data,
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

// PATCH update an "Unknown" plan with second_destination object
router.patch(
  "/plan-update-second-destination",
  verifyToken,
  async (req, res) => {
    try {
      const { second_destination, plan_id } = req.body;

      const existingPlan = await prisma.plan.findUnique({
        where: {
          id: parseInt(plan_id),
        },
      });

      if (!existingPlan)
        return res.status(400).json({ error: "Plan not found." });

      const updatedResultData = {
        ...existingPlan.plan_data,
        second_destination: second_destination,
      };

      // update the plan to include second_destination data
      const updatedPlan = await prisma.plan.update({
        where: {
          id: parseInt(plan_id),
        },
        data: {
          plan_data: updatedResultData,
        },
      });

      res.json(updatedPlan);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// PATCH update an "Unknown" or "Known" plan with destination object (e.g. first destination)
router.patch("/plan-update-destination", verifyToken, async (req, res) => {
  try {
    const { destination, plan_id } = req.body;

    const existingPlan = await prisma.plan.findUnique({
      where: {
        id: parseInt(plan_id),
      },
    });

    if (!existingPlan)
      return res.status(400).json({ error: "Plan not found." });

    const updatedResultData = {
      ...existingPlan.plan_data,
      destination: destination,
    };

    // update the plan to include second_destination data
    const updatedPlan = await prisma.plan.update({
      where: {
        id: parseInt(plan_id),
      },
      data: {
        plan_data: updatedResultData,
      },
    });

    res.json(updatedPlan);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

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
        plan_data: true,
        created_at: true,
        id: true,
        photos_first_destination: true,
        photos_second_destination: true,
        planShares: {
          select: {
            email: true,
          },
        },
      },
    });

    console.log("Here is allPlans from 'me' route: ", allPlans);

    const plansFormattedDates = allPlans.map((plan) => ({
      plan_type: plan.plan_type,
      plan_data: plan.plan_data,
      photos_first_destination: plan.photos_first_destination,
      photos_second_destination: plan.photos_second_destination,
      created_at: plan.created_at.toLocaleString(),
      id: plan.id,
      shared_with: plan.planShares.map((share) => share.email),
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

// GET to pull all users shared on a given trip, by the trip owner (rendered on the "Me" page)
router.get("/plan-shared-users", verifyToken, async (req, res) => {
  try {
    // Finds all users that a given plan has been shared with

    const plan_id = req.body.plan_id;

    const getSharedUsers = await prisma.planShares.findMany({
      where: {
        plan_id: plan_id,
      },
      select: {
        email: true,
      },
    });

    const allSharedUsers = getSharedUsers.map((user) => user.email);

    res.status(200).send({
      allSharedUsers,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// GET for name and email to update userInfo state on Home page
router.get("/me", verifyToken, async (req, res) => {
  try {
    const userData = await prisma.user.findFirst({
      where: {
        id: parseInt(req.user),
      },
      select: {
        first_name: true,
        email: true,
      },
    });

    res.status(200).send({
      firstName: userData.first_name,
      email: userData.email,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// GET to pull all trips shared with a given user (rendered on the "Me" page)
router.get("/plans-shared-with-me", verifyToken, async (req, res) => {
  try {
    // Finds all shared plans for a user by email in planShares table
    // Includes relational fields from Plan and User tables to grab plan data, and who shared the plan
    const allPlanShares = await prisma.planShares.findMany({
      where: {
        email: req.email,
      },
      orderBy: {
        id: "desc",
      },
      include: {
        plan: {
          select: {
            plan_type: true,
            plan_data: true,
            photos_first_destination: true,
            photos_second_destination: true,
            created_at: true,
            id: true,
          },
        },
        user: {
          select: {
            email: true,
            first_name: true,
          },
        },
      },
    });

    console.log("here is allPlanShares:", allPlanShares);

    const plansFormattedDates = allPlanShares.map((plan) => ({
      plan_type: plan.plan.plan_type,
      plan_data: plan.plan.plan_data,
      photos_first_destination: plan.plan.photos_first_destination,
      photos_second_destination: plan.plan.photos_second_destination,
      created_at: plan.plan.created_at.toLocaleString(),
      id: plan.plan.id,
      invited_by_name: plan.user.first_name,
      invited_by_email: plan.user.email,
    }));

    res.status(200).send({
      plansFormattedDates,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Create a post route to add shared users to a plan
router.post("/share-plan-users", verifyToken, async (req, res) => {
  try {
    const user_id = req.user;
    const plan_id = req.body.plan_id;
    const emails = req.body.emails;

    await prisma.planShares.createMany({
      data: emails.map((email) => ({
        plan_id: plan_id,
        email: email,
        invited_by_user_id: user_id,
      })),
      skipDuplicates: true,
    });

    res.status(200).send({
      message: "Plan shared successfully",
      shared_with: emails.length,
      plan_id: plan_id,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// gets all plans (planIds) that a user has access to (created and shared)
// Verifies that the user can see a plan in PlanDetail component
router.get("/my-accessible-plans", verifyToken, async (req, res) => {
  try {
    // Gets all plan_ids from plans that the user created
    const userCreatedPlanIds = await prisma.plan.findMany({
      where: {
        user_id: req.user,
      },
      select: {
        id: true,
      },
    });

    // Gets all plan_ids from plans that were shared with the user
    const sharedPlanIds = await prisma.planShares.findMany({
      where: {
        email: req.email,
      },
      select: {
        plan_id: true,
      },
    });

    // Combines created and shared ids in a new array, listing out all ids
    const allIds = [
      ...userCreatedPlanIds.map((plan) => plan.id),
      ...sharedPlanIds.map((share) => share.plan_id),
    ];

    res.json(allIds);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
