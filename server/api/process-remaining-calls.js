import express from "express";
const router = express.Router();

router.post("/", async (req, res) => {
  const { userResponses, planId, questionPromptsUnknown, firstDestination } =
    req.body;
  console.log("Here is req.body:", req.body);
  console.log("Here is userResponses:", req.body.userResponses);
  console.log("Here is firstDestination deconstructed:", firstDestination);
});

export default router;
