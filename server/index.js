import express from "express";
import { PORT, mongoDBUrl } from "./config.js";
import mongoose from "mongoose";
import cors from "cors";
import booksRoute from "./routes/booksRoute.js";

const app = express();

//middleware for parsing request body into json
app.use(express.json());

// middleware for handling CORS policy
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

app.get("/", (req, res) => {
  return res.status(234).send("Welcome to azw MERN");
});

// books routes
app.use("/books", booksRoute);

mongoose
  .connect(mongoDBUrl)
  .then(() => {
    console.log("App connected to database");
    app.listen(PORT, () => {
      console.log(`App listening on port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
