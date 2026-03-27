import express from "express";
import { getUsers } from "../controller/users/get-users";
import { getUsersById } from "../controller/users/get-users-by-id";
import { updateUsersById } from "../controller/users/update-users-by-id";
import { addUsers } from "../controller/users/add-users";

export const usersRouter = express.Router();

usersRouter.get("/", getUsers);

usersRouter.get("/:id", getUsersById);

usersRouter.put("/:id", updateUsersById);

usersRouter.post("/", addUsers);

usersRouter.delete("/:id", getUsersById);
