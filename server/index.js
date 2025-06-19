import express from "express";
// creates an instance of Express
const app = express();
// allows frontend to make requests to backend
import cors from "cors";

// Node.js utility for working with file / directory paths
import path from "path";
import { fileURLToPath } from "url";

// Sets the port to receive HTTP requests from frontend
const port = process.env.PORT || 8080;

// Imports the router modules for the API and other route files (google, anthropic)  and stores in varaibles
import anthropicRoutes from "./api/anthropicAPI.js";
import gptRoutes from "./api/gptAPI.js";
import authRoutes from "./auth/index.js";
import userRoutes from "./api/users.js";
import planRoutes from "./api/plans.js";
import remainingCallRoutes from "./api/process-remaining-calls.js";

import { PrismaClient } from "./generated/prisma/client.ts";
const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// *** Middleware setup
// Allows API to receive requests from different ports / domains (e.g. server on 8080, frontend on 3000)
// e.g. frontend can communicate with backend
// Browsers don't allow web applications to make requests to a different domain (security protocol) unless specified in CORS (for ex)
app.use(cors());
// JSON parsing middleware that's native to Express
app.use(express.json());

// Logging incoming requests for debugging
app.use((req, res, next) => {
  // Shows HTTP method (ex. GET, PUT) and endpoint (ex. /api/anthropic)
  console.log(req.method, req.url);
  // Shows the body of the request (if there is a body...GET typically won't have a body)
  if (req.body) console.log(req.body);
  next();
});

// Register / create the routes
// Attaches (or, mounts) a router (application that handles routes) to a base URL (ex. /anthropicAPI)
// ALl incoming requests (GET, PUT, etc.) to this route will be handled by this router
app.use("/api/anthropicAPI", anthropicRoutes);
app.use("/api/gptAPI", gptRoutes);
app.use("/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/plans", planRoutes);
app.use("/api/process-remaining-calls", remainingCallRoutes);

app.use(express.static(path.join(__dirname, "/../client/dist")));

if (process.env.NODE_ENV === "production") {
  // After your API routes, add this for client-side routing
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/../client/dist/index.html"));
  });
}

// Handles errors in serving (middleware)
app.use((err, req, res, next) => {
  console.error("server error", err);
  res.status(500).json({ error: "Internal server error" });
});

// Start up the server and log confirmation
app.listen(port, () => {
  console.log(`Travel app is running on port ${port}`);
});
