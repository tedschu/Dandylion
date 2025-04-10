const express = require("express");
// creates an instance of Express
const app = express();
// allows frontend to make requests to backend
const cors = require("cors");
// middleware...parses incoming request bodies and makes data available to req.body
const bodyParser = require("body-parser");
// Node.js utility for working with file / directory paths
const path = require("path");

// Sets the port to receive HTTP requests from frontend
const port = process.env.PORT || 8080;

// Imports the router modules for the API files (google, anthropic) and stores in varaibles
const anthropicRoutes = require("./api/anthropicAPI");
const googlePlacesRoutes = require("./api/googlePlacesAPI");
