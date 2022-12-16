import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import User from "./models/userModel";
import cors from "cors";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";

console.log("test!");

const app = express();
const port = 5000;

// connectDB();

app.use(cors());

app.get("/", (_, res) => {
  res.status(200).send();
});

app.use(bodyParser.json()).use(bodyParser.urlencoded({ extended: true }));

// Handle register

app.listen(port, () => console.log(`Running on port http://localhost:${port}`));
