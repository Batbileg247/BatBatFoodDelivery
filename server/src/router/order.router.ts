import express from "express";
import { deleteOrder } from "../controller/orders/delete-order";
import { getOrderById } from "../controller/orders/get-order-by-id";
import { getOrders } from "../controller/orders/get-orders";
import { addOrder } from "../controller/orders/add-order";
import { updateOrder } from "../controller/orders/update-status";
import { adminMiddleware } from "../middleware/admin-middleware";
import { authMiddleware } from "../middleware/auth-middleware";

export const orderRouter = express.Router();

orderRouter.get("/", authMiddleware, adminMiddleware, getOrders);

orderRouter.get("/:id", getOrderById);

orderRouter.post("/", authMiddleware, addOrder);

orderRouter.put("/:id", authMiddleware, adminMiddleware, updateOrder);

orderRouter.delete("/:id", deleteOrder);
