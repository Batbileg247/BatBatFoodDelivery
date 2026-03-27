import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const deleteCategories = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const catRemove = await prisma.foodCategory.delete({
      where: { id: Number(id) },
    });

    res.json({ catRemove });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
