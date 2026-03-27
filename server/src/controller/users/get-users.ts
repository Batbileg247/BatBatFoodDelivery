import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    res.json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
