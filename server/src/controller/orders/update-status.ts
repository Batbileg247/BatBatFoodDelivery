import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const updateOrder = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const food = await prisma.foodOrder.update({
      where: {
        id: Number(id),
      },
      data: {
        status,
      },
    });

    res.json({ food });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
