import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../db/prisma";

const users: any[] = [];

const JWT_SECRET = "dev-secret";

export const authService = {
  async register(email: string, password: string) {
    const hashed = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashed,
      },
    });

    users.push(user);
    return { id: user.id, email: user.email };
  },

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) return null;

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );
    return { token };
  },
};
