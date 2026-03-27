import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const updateUsersById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { phoneNumber, address, password, isVerified, role } = req.body;
  try {
    const users = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        phoneNumber,
        address,
        password,
        isVerified,
        role
      },
    });

    res.json({ users });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
