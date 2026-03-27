import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getFood = async (req: Request, res: Response) => {
  try {
    const food = await prisma.food.findMany();

    res.json({ food });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
