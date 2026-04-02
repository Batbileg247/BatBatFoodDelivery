import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const order = await prisma.foodOrder.findMany({
      include: {
        user: true,
        orderItems: {
          include: {
            food: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.json({ order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
