// import compression from 'compression';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import express from 'express';
// import connectDB from './config/db.js';
// import { PORT } from './config/utils.js';
// import authRouter from './routes/auth.js';
// import postsRouter from './routes/posts.js';
// import { connectToRedis } from './services/redis.js';

// const app = express();
// const port = PORT || 5000;

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use(cookieParser());
// app.use(compression());

// // Connect to database
// connectDB();

// // Connect to redis
// connectToRedis();

// // API routes
// app.use('/api/posts', postsRouter);
// app.use('/api/blogs', postsRouter); // ✅ Added compatibility route
// app.use('/api/auth', authRouter);

// app.get('/', (req, res) => {
//   res.send('Yay!! Backend of wanderlust prod app is now accessible');
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// export default app;





import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import connectDB from './config/db.js';
import { PORT } from './config/utils.js';
import authRouter from './routes/auth.js';
import postsRouter from './routes/posts.js';
import { connectToRedis } from './services/redis.js';

const app = express();
const port = PORT || 8080;

// ---------------------------
// CORS CONFIG (VERY IMPORTANT)
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
// HEALTH CHECK ENDPOINTS
// Required for Kubernetes
// ---------------------------
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// ---------------------------
// API ROUTES
// ---------------------------
app.use('/api/posts', postsRouter);
app.use('/api/blogs', postsRouter);
app.use('/api/auth', authRouter);

// Root endpoint
app.get('/', (req, res) => {
  res.send('✔ Backend of Wanderlust is running successfully!');
});

// ---------------------------
// START SERVER
// ---------------------------
app.listen(port, () => {
  console.log(`🚀 Server is running on port ${port}`);
});

export default app;
