import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";
import { PORT } from "./config/utils.js";
import authRouter from "./routes/auth.js";
import postsRouter from "./routes/posts.js";
import { connectToRedis } from "./services/redis.js";

const app = express();
const port = PORT || 8080;

// ---------------------------
// CORS CONFIG
// ---------------------------
const allowedOrigin = process.env.FRONTEND_URL || "*";

app.use(
  cors({
    origin: allowedOrigin,
    credentials: true,
  })
);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compression());

// ---------------------------
// DATABASE + REDIS CONNECTION
// ---------------------------
connectDB();
connectToRedis();

// ---------------------------
// HEALTH CHECK ENDPOINTS (K8s)
// ---------------------------
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// ---------------------------
// API ROUTES
// ---------------------------
app.use("/api/posts", postsRouter);
app.use("/api/blogs", postsRouter);
app.use("/api/auth", authRouter);

// Root endpoint
app.get("/", (req, res) => {
  res.send("✔ Backend of Wanderlust is running successfully!");
});

// ---------------------------
// START SERVER WITH GRACEFUL SHUTDOWN
// ---------------------------
const server = app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

// ---------------------------
// GRACEFUL SHUTDOWN (Fixes CrashLoopBackOff)
// ---------------------------
process.on("SIGTERM", () => {
  console.log("SIGTERM received → graceful shutdown in progress...");
  server.close(() => {
    console.log("HTTP server closed cleanly.");
    process.exit(0);
  });
});

process.on("SIGINT", () => {
  console.log("SIGINT received → shutting down...");
  server.close(() => {
    process.exit(0);
  });
});

export default app;
