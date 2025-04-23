import db from "../../db";
import type { Prisma } from "@prisma/client";

const userVisibleFields = {
  id: true,
  username: true,
  email: true,
  firstname: true,
  lastname: true,
  refresh_token: true,
  created_at: true,
  updated_at: true,
};

class UserService {
  db;

  constructor() {
    this.db = db;
  }

  async getUniqueUser(options: Prisma.UserWhereUniqueInput) {
    const userData = await this.db.user.findUnique({
      where: {
        ...options,
      },
      select: userVisibleFields,
    });

    return userData;
  }

  async getUserByKeys(options: Prisma.UserWhereInput) {
    const userData = await this.db.user.findFirst({
      where: {
        ...options,
      },
      select: userVisibleFields,
    });

    return userData;
  }

  async createUser(data: Prisma.UserCreateInput) {
    const userData = await this.db.user.create({
      data: {
        ...data,
      },
      select: userVisibleFields,
    });

    return userData;
  }

  update() {}
}

const userService = new UserService();

export default userService;
