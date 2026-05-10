import {Module} from "@nestjs/common";
import {LoginController} from "@/features/common/auth/login/login.controller";
import {UserController} from "@/features/common/auth/user/user.controller";
import {CreateUserHandler} from "@/features/common/auth/user/command/create-user/create-user.handler";
import {CreateLoginAdminHandler} from "@/features/common/auth/login/command/create-login/create-login.handler";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      secret: 'salom123salom123',
      signOptions: {expiresIn: '60s'},
    }),
  ],
  controllers: [LoginController,UserController],
  providers: [
    CreateLoginAdminHandler,
    CreateUserHandler
  ]
})

export class AuthModule {}