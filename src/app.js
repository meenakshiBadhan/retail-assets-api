const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Error handling middleware
const { genericErrorHandler } = require("./middlewares/errorHandlers");

// Routes
const routes = require("./routes");
app.use("/api", routes);

// Check server status
app.get("/", (req, res) => {
  res.send("Express server is running");
});

// Generic error handler
app.use(genericErrorHandler);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
