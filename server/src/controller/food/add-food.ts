import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const addFood = async (req: Request, res: Response) => {
  const { name, price, image, ingredients, foodCatId } = req.body;
  try {
    const food = await prisma.food.create({
      data: {
        name,
        price,
        image,
        ingredients,
        foodCatId,
      },
    });

    res.json({ food });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
