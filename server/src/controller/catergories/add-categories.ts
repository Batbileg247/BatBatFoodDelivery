import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const addCategories = async (req: Request, res: Response) => {
  const { categoryName } = req.body;
  try {
    const cat = await prisma.foodCategory.create({
      data: {
        categoryName,
      },
    });

    res.json({ cat });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
