import express from "express";
import { deleteOrder } from "../controller/orders/delete-order";
import { getOrderById } from "../controller/orders/get-order-by-id";
import { getOrders } from "../controller/orders/get-orders";
import { addOrder } from "../controller/orders/add-order";
import { updateOrder } from "../controller/orders/update-status";

export const orderRouter = express.Router();

orderRouter.get("/", getOrders);

orderRouter.get("/:id", getOrderById);

orderRouter.post("/", addOrder);

orderRouter.put("/:id", updateOrder);

orderRouter.delete("/:id", deleteOrder);
