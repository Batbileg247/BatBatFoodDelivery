import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const updateCategories = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { categoryName } = req.body;
  try {
    const categories = await prisma.foodCategory.update({
      where: {
        id: Number(id),
      },
      data: {
        categoryName,
      },
    });

    res.json({ categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
