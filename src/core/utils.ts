import 'dotenv/config';
import {Role} from "@/core/enum/enum";
import argon2 from "argon2";
import AppDataSource from "@/data-source";
import {UserEntity} from "@/features/common/auth/user.entity";

export async function createSuperAdmin() {
  const adminFullName = process.env.ADMIN_FULLNAME;
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword || !adminUsername || !adminFullName) {
    throw new Error("Admin username and password not found in environment variables");
  }

  await AppDataSource.initialize();

  const userRepo = AppDataSource.getRepository<UserEntity>(UserEntity);

  const alreadyExists = await userRepo.existsBy({userName: adminUsername});
  if (!alreadyExists) {
    const newSuperAdmin = userRepo.create({
      role: Role.SUPER_ADMIN, userName: adminUsername, fullName: adminFullName, isActive: true, isVerified: true, password: ""
    } as UserEntity);
    newSuperAdmin.password = await argon2.hash(adminPassword);
    await UserEntity.save(newSuperAdmin);
  }
}