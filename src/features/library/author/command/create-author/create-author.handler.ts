import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {CreateAuthorCommand} from "@/features/library/author/command/create-author/create-author.command";
import {CreateAuthorResponse} from "@/features/library/author/command/create-author/create-author.response";
import {AuthorEntity} from "@/features/library/author/author.entity";

@CommandHandler(CreateAuthorCommand)
export class CreateAuthorHandler implements ICommandHandler<CreateAuthorCommand> {
  async execute(command: CreateAuthorCommand): Promise<CreateAuthorResponse> {
    const author = {fullName: command.fullName} as AuthorEntity;
    await AuthorEntity.save(author);
    return plainToInstance(CreateAuthorResponse, author, {excludeExtraneousValues: true});
  }
}