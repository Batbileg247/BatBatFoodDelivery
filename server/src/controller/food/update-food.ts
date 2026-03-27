import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const updateFood = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, image, ingredients, foodCatId, category } = req.body;
  try {
    const food = await prisma.food.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        price,
        image,
        ingredients,
        foodCatId,
        category,
      },
    });

    res.json({ food });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
