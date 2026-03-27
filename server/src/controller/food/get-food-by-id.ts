import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getFoodById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const food = await prisma.foodCategory.findFirst({
      where: {
        id: Number(id),
      },
      include: { foods: true },
    });

    res.json({ food });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
