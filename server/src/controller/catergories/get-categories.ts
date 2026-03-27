import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.foodCategory.findMany({
      include: { foods: true },
    });

    res.json({ categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
