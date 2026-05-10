import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import argon2 from "argon2";
import {BadRequestException, UnauthorizedException} from "@nestjs/common";
import {Role} from "@/core/enum/enum";
import {CreateUserCommand} from "@/features/common/auth/user/command/create-user/create-user.command";
import {CreateUserResponse} from "@/features/common/auth/user/command/create-user/create-user.response";
import {UserEntity} from "@/features/common/auth/user.entity";

@CommandHandler(CreateUserCommand)
export class CreateUserHandler implements ICommandHandler<CreateUserCommand> {
  async execute(cmd: CreateUserCommand): Promise<CreateUserResponse> {

    const alreadyExists = await UserEntity.findOneBy({userName: cmd.userName})
    if (alreadyExists) {
      throw new BadRequestException('userName alreadyExists')
    }

    const passwordHash = await argon2.hash(cmd.password)

    const user = UserEntity.create({
      role: cmd.role,
      userName: cmd.userName,
      fullName: cmd.fullName,
      password: passwordHash,
      birthDate: cmd.birthDate,
      isVerified: cmd.isVerified,
      isActive: cmd.isActive
    })

    await UserEntity.save(user)
    return plainToInstance(CreateUserResponse, user, {excludeExtraneousValues: true})
  }
}