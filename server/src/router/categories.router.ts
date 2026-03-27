import express from "express";
import { addCategories } from "../controller/catergories/add-categories";
import { deleteCategories } from "../controller/catergories/delete-categories";
import { updateCategories } from "../controller/catergories/update-categories";
import { getCategoriesById } from "../controller/catergories/get-categories-by-id";
import { getCategories } from "../controller/catergories/get-categories";

export const categoriesRouter = express.Router();

categoriesRouter.get("/", getCategories);

categoriesRouter.get("/:id", getCategoriesById);

categoriesRouter.put("/:id", updateCategories);

categoriesRouter.post("/", addCategories);

categoriesRouter.delete("/:id", deleteCategories);