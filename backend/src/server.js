import dotenv from "dotenv";
dotenv.config();

import express from "express";
//const express = require("express");
import cors from "cors"
import { connect } from "mongoose";
import path from "path"; //Build into Node.js module that provides utilities for working with file and directory paths. It helps in handling file paths in a platform-independent way.


import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notesRoutes.js";
import rateLimiter from "./middleware/rateLimiter.js";






const app = express();
const _dirname =path.resolve() // Get the absolute path of the current directory. It is used to construct file paths for serving static files and other purposes.
//console.log(_dirname); Ths will print the absolute path of backend/src/server.js file in the console. It helps in debugging and verifying the correct path resolution.



//This condition checks whether the application is running in a production environment. If it is not, the following code block will be executed to serve the CORS middleware configuration.
if(process.env.NODE_ENV !== "production") { 
     app.use(cors({
        origin: "http://localhost:5173",
}));

}
   


app.use(express.json()); // Middleware to parse JSON request bodies: req.body will contain the parsed JSON data from incoming requests.
app.use(rateLimiter); // Middleware to limit the number of requests a client can make within a certain time frame. It helps prevent abuse and ensures fair usage of the API.




// app.use((req, res, next) => {  Middleware to get something before the response is sent back to the client. It logs the request method and URL for debugging purposes.
//     console.log(`Request method is ${req.method}`);
//     console.log(`Request URL is ${req.url}`);
//     next();
// });



app.use("/api/notes", notesRoutes);


//This condition checks if the application is running in a production environment. If it is, the following code block will be executed to serve the frontend files.
if(process.env.NODE_ENV === "production") { 
    app.use(express.static(path.join(_dirname, "frontend", "dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(_dirname, "frontend", "dist", "index.html"));
    })
}



connectDB()
  .then(() => app.listen(5001, () => console.log("Server started at port 5001")))
  .catch((err) => {
    console.error("Failed to connect to DB:", err);
    process.exit(1);
  });
