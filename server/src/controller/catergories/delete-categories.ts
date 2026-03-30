import { Request, Response, NextFunction } from "express";
import { prisma } from "../../lib/prisma";

export const deleteCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { id } = req.params;
    const categoryId = Number(id);

    if (isNaN(categoryId)) {
      res.status(400).json({ message: "Invalid ID format" });
      return;
    }
    const category = await prisma.foodCategory.findUnique({
      where: { id: categoryId },
    });

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }
    await prisma.$transaction(async (tx) => {
      const foodsInCat = await tx.food.findMany({
        where: { foodCatId: categoryId },
        select: { id: true },
      });
      const foodIds = foodsInCat.map((f) => f.id);

      await tx.foodOrderItems.deleteMany({
        where: { foodId: { in: foodIds } },
      });
      await tx.food.deleteMany({
        where: { foodCatId: categoryId },
      });
      await tx.foodCategory.delete({
        where: { id: categoryId },
      });
    });

    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DETAILED PRISMA ERROR:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: String(error) });
  }
};
