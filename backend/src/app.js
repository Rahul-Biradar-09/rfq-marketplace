const express = require("express");

const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const errorHandler = require("./middleware/error.middleware");

const rfqRoutes = require("./routes/rfq.routes");
const quotationRoutes = require("./routes/quotation.routes");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "RFQ Marketplace API is running",
  });
});

app.use("/api/auth", authRoutes);

app.use("/api/rfqs", rfqRoutes);

app.use("/api", quotationRoutes);

app.use(errorHandler);

module.exports = app;