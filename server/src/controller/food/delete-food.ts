import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const deleteFood = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const foodRemove = await prisma.food.delete({ where: { id: Number(id) } });

    res.json({ foodRemove });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
