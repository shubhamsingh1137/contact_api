// console.log("api project");
import express from "express";
import mongoose from "mongoose";
import bodyparser from "express";
import cors from "cors";
import userRouter from "./routes/user.js";
import contactRouter from "./routes/contact.js";
import { config } from "dotenv";
const app = express();

// CORS enable
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// express ko batana hai ki hamne json beja hai body me postman se
app.use(bodyparser.json());

// .env setup
config({ path: ".env" });

//user routes
//@api dsc:-user register
//@api method:-post
//@api endpoint:-/api/user/register

app.use("/api/user", userRouter);

// contact Router
app.use("/api/contact", contactRouter);

//make home routes for testing
app.get("/", (req, res) => {
  res.json({ message: "this is home page" });
});

mongoose
  .connect(process.env.MONGO_URI, {
    dbName: "api-integration",
  })
  .then(() => console.log("mongoose is conected"))
  .catch((err) => console.log(err));

const port = process.env.PORT;
app.listen(port, () => console.log(`server run on port ${port}`));
