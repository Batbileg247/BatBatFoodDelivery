import express from "express";
import { usersRouter } from "./router/users.router";
import { categoriesRouter } from "./router/categories.router";
import { foodRouter } from "./router/food.router";
import { orderRouter } from "./router/order.router";
import { authRouter } from "./router/auth.router";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

app.use(express.json());

app.use("/users", usersRouter);

app.use("/categories", categoriesRouter);

app.use("/food", foodRouter);

app.use("/orders", orderRouter);

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
