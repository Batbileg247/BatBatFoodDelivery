import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getUsersById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const userRemove = await prisma.user.delete({ where: { id: Number(id) } });

    res.json({ userRemove });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
