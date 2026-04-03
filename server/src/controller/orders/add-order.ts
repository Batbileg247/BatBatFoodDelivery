import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

type FoodOrder = {
  foodId: number;
  quantity: number;
};

type BodyType = {
  orderItems: FoodOrder[];
  userId: number;
};

export const addOrder = async (req: Request, res: Response) => {
  const { userId, orderItems }: BodyType = req.body;
  try {
    const totalPrice = await calcTotalPrice(orderItems);

    const order = await prisma.foodOrder.create({
      data: {
        userId,
        totalPrice: totalPrice,
        status: "Pending",
        orderItems: {
          create: orderItems.map((item) => ({
            quantity: item.quantity,
            food: { connect: { id: item.foodId } },
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    res.json({ order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};

const calcTotalPrice = async (orderItems: FoodOrder[]) => {
  const foodIds = orderItems.map((i) => i.foodId);

  const foods = await prisma.food.findMany({
    where: {
      id: {
        in: foodIds,
      },
    },
  });
  const orderWithPrice = orderItems.map((order) => {
    const foundedItem = foods.find((food) => food.id === order.foodId);
    return { ...order, price: foundedItem?.price };
  });

  const calculate = orderWithPrice.reduce((acc, curr) => {
    return acc + Number(curr.price) * Number(curr.quantity);
  }, 0);
  return calculate.toString();
};
