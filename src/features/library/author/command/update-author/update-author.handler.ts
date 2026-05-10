import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {UpdateAuthorCommand} from "@/features/library/author/command/update-author/update-author.command";
import {UpdateAuthorResponse} from "@/features/library/author/command/update-author/update-author.response";
import {AuthorEntity} from "@/features/library/author/author.entity";

@CommandHandler(UpdateAuthorCommand)
export class UpdateAuthorHandler implements ICommandHandler<UpdateAuthorCommand> {
  async execute(command: UpdateAuthorCommand): Promise<UpdateAuthorResponse> {
    const author = await AuthorEntity.findOneBy({id: command.id});

    if (!author)
      throw new NotFoundException("Author with given id not found");

    if (command.fullName !== undefined)
      author.fullName = command.fullName;

    await AuthorEntity.save(author);
    return plainToInstance(UpdateAuthorResponse, author, {excludeExtraneousValues: true});
  }
}