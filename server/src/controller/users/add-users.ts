import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

export const addUsers = async (req: Request, res: Response) => {
  const { email, password, phoneNumber, address, role, isVerified } = req.body;

  const securePasssword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: securePasssword,
        phoneNumber,
        address,
        role,
        isVerified,
      },
    });

    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
};
