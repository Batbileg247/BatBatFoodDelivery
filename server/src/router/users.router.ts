import express from "express";
import { getUsers } from "../controller/users/get-users";
import { getUsersById } from "../controller/users/get-users-by-id";
import { updateUsersById } from "../controller/users/update-users-by-id";
import { addUsers } from "../controller/users/add-users";
import { me } from "../controller/users/me";
import { authMiddleware } from "../middleware/auth-middleware";
import { adminMiddleware } from "../middleware/admin-middleware";

export const usersRouter = express.Router();

usersRouter.get("/", authMiddleware, adminMiddleware, getUsers);
    
usersRouter.get("/me", adminMiddleware, me);

usersRouter.get("/:id", getUsersById);

usersRouter.put("/:id", updateUsersById);

usersRouter.post("/", addUsers);

usersRouter.delete("/:id", getUsersById);
