import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const userLogin = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isVerified = await bcrypt.compare(password, user.password);

    if (isVerified) {
      const token = jwt.sign(
        {
          data: {
            userId: user.id,
            email: user.email,
            role: user.role,
          },
        },
        "secret",
        { expiresIn: "100h" },
      );
      res.status(200).json({ message: "Success", accessToken: token });
    } else {
      res.status(404).json({ message: "Password is incorrect" });
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({
        message: "Something went happened",
        error: err.message,
      });
    }
  }
};
