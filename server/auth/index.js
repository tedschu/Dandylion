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

    const hashPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await prisma.user.create({
      data: {
        email: email,
        first_name: firstName,
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

// Logs in a user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    //checks if the user exists
    const userMatch = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        first_name: true,
        password: true,
        email: true,
      },
    });

    if (!userMatch) {
      return res.status(401).send({ message: "Invalid login credentials" });
    }

    const passMatch = await bcrypt.compare(password, userMatch.password);
    if (!passMatch) {
      return res.status(401).send({ message: "Invalid login credentials" });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        login_count: {
          increment: 1,
        },
        last_login: new Date().toISOString(),
      },
    });

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 48,
        data: { id: userMatch.id, email: userMatch.email },
      },
      process.env.JWT_SECRET
    );
    res.status(200).send({
      token: token,
      id: userMatch.id,
      firstName: userMatch.first_name,
      email: userMatch.email,
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

export default router;
