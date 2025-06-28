// require ('dotenv').config({path: './env'})

import connectDB from "./db/db.js";
import dotenv from "dotenv"

dotenv.config()

connectDB()



















/*
1. First Approch :-
import express from "express";
const app = express();

// we use iife :-
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    app.on("error", (error) => {
      console.log("Error:", error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
        console.log(`App is listning on port ${process.env.PORT}`);
        
    })

  } catch (error) {
    console.error("Error", error);
    throw error;
  }
})();
*/

