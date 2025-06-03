import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const saltRounds = 10;
import { PrismaClient } from "../generated/prisma/client.ts";

const prisma = new PrismaClient();

// Creates a new user via registration, adds a token
router.post("/register", async (req, res) => {
  try {
    const { email, firstName, password } = req.body;

    // Checks to see if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "Email already exists.",
      });
    }

    if (!email || !firstName || !password) {
      return res
        .status(400)
        .json({ error: "Make sure you've completed all fields." });
    }

    const hashPassword = await bcrypt.hash(req.body.password, saltRounds);
    const newUser = await prisma.user.create({
      data: {
        email: req.body.email,
        first_name: req.body.firstName,
        password: hashPassword,
        login_count: 1,
        last_login: new Date().toISOString(),
        created_at: new Date().toISOString(),
      },
    });

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 48,
        data: { id: newUser.id, email: newUser.email },
      },
      process.env.JWT_SECRET
    );

    res.json({
      token: token,
      user: {
        id: newUser.id,
        firstName: newUser.first_name,
        email: newUser.email,
        login_count: newUser.login_count,
        last_login: newUser.last_login,
        created_at: newUser.created_at,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Registration failed" });
  }
});

export default router;
