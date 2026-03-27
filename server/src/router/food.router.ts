import express from "express";
import { getFood } from "../controller/food/get-food";
import { getFoodById } from "../controller/food/get-food-by-id";
import { updateFood } from "../controller/food/update-food";
import { addFood } from "../controller/food/add-food";
import { deleteFood } from "../controller/food/delete-food";

export const foodRouter = express.Router();

foodRouter.get("/", getFood);

foodRouter.get("/:id", getFoodById);

foodRouter.put("/:id", updateFood);

foodRouter.post("/", addFood);

foodRouter.delete("/:id", deleteFood);