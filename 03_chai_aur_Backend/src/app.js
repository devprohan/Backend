import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN, // Allow only this frontend origin
    credentials: true,               // Allow cookies to be sent
  })
);

app.use(cookieParser());

app.use(express.json({limit: "16kb"})); // json se data ayega tb read krne ke liye

app.use(express.urlencoded({extended: true, limit: "16kb"})) // url se data ayega tb read krne ke liye

app.use(express.static("public"))


export { app };
