import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
export const deleteCategories = async (req: Request, res: Response) => {
  const { id } = req.params;
  const categoryId = Number(id);

  try {
    await prisma.food.deleteMany({
      where: { foodCatId: categoryId },
    });

    const catRemove = await prisma.foodCategory.delete({
      where: { id: categoryId },
    });

    res.json({ catRemove });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete category" });
  }
};
