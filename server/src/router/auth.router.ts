import express from "express";
import { userLogin } from "../controller/auth/login";

export const authRouter = express.Router();

authRouter.post("/login", userLogin);
