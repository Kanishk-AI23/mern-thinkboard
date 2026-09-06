import express from "express";
//const express = require("express");
import dotenv from "dotenv"; 
import cors from "cors"
import { connect } from "mongoose";


import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesroutes.js";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();



const app = express();


app.use(cors({
    origin: "http://localhost:5173",
}));
app.use(express.json()); // Middleware to parse JSON request bodies: req.body will contain the parsed JSON data from incoming requests.
app.use(rateLimiter); // Middleware to limit the number of requests a client can make within a certain time frame. It helps prevent abuse and ensures fair usage of the API.



// app.use((req, res, next) => {  Middleware to get something before the response is sent back to the client. It logs the request method and URL for debugging purposes.
//     console.log(`Request method is ${req.method}`);
//     console.log(`Request URL is ${req.url}`);
//     next();
// });

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
    app.listen(5001, () => {
        console.log("Server started at port 5001");
    });
});
