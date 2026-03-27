import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getOrderById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const order = await prisma.foodOrder.findFirst({
      where: {
        id: Number(id),
      },
    });

    res.json({ order });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
