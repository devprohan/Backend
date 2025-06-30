import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Create app
const app = express();

// Express Middelware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Allow only this frontend origin
    credentials: true, // Allow cookies to be sent
  })
);

app.use(cookieParser());

app.use(express.json({ limit: "16kb" })); // json se data ayega tb read krne ke liye

app.use(express.urlencoded({ extended: true, limit: "16kb" })); // url se data ayega tb read krne ke liye

app.use(express.static("public"));

// Routes Import:
import userRouter from "./routes/user.routes.js"

// Routes Declaration:
app.use("/api/v1/users", userRouter)

// export app
export { app };
