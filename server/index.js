const express = require("express");
// creates an instance of Express
const app = express();
// allows frontend to make requests to backend
const cors = require("cors");

// Node.js utility for working with file / directory paths
const path = require("path");

// Sets the port to receive HTTP requests from frontend
const port = process.env.PORT || 8080;

// Imports the router modules for the API files (google, anthropic) and stores in varaibles
const anthropicRoutes = require("./api/anthropicAPI");
const unsplashRoutes = require("./api/unsplashAPI");

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

// Register / create the API routes
// Attaches (or, mounts) a router (application that handles routes) to a base URL (ex. /anthropicAPI)
// ALl incoming requests (GET, PUT, etc.) to this route will be handled by this router
app.use("/api/anthropicAPI", anthropicRoutes);
app.use("/api/unsplashAPI", unsplashRoutes);

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
