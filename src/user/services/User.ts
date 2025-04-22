import db from "../../db";
import type { Prisma } from "@prisma/client";

class AuthService {
  db;

  constructor() {
    this.db = db;
  }

  async create(data: Prisma.UserCreateInput) {
    const userData = await this.db.user.create({
      data: {
        ...data,
      },
      select: {
        username: true,
        firstname: true,
        lastname: true,
        email: true,
        refresh_token: true,
        created_at: true,
        updated_at: true,
        id: true,
      },
    });

    return userData;
  }

  update() {}
}

const authService = new AuthService();

export default authService;
