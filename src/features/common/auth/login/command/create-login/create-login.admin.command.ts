import {Command} from "@nestjs/cqrs";
import {CreateLoginAdminResponse} from "@/features/common/auth/login/command/create-login/create-login.response";

export class CreateLoginAdminCommand extends Command<CreateLoginAdminResponse>{
  constructor(
    public userName: string,
    public password: string
  ) {
    super();
  }
}