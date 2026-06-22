require("dotenv").config();

const express = require("express");
const cors = require("cors");

const {
  authenticateJWT
} = require("./middleware/auth");

const transactionRoutes =
  require("./routes/transactions");

const simulatorRoutes =
  require("./routes/simulator");

const authRoutes =
  require("./routes/auth");

const reminderRoutes =
  require("./routes/reminders")

const app = express();

app.use(cors());
app.use(express.json());

app.use(authenticateJWT);

app.use("/auth", authRoutes);
app.use("/transactions", transactionRoutes);
app.use("/simulator", simulatorRoutes);
app.use("/reminders", reminderRoutes);

module.exports = app;