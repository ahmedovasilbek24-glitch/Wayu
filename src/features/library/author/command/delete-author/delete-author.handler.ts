import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {DeleteAuthorCommand} from "@/features/library/author/command/delete-author/delete-author.command";
import {AuthorEntity} from "@/features/library/author/author.entity";

@CommandHandler(DeleteAuthorCommand)
export class DeleteAuthorHandler implements ICommandHandler<DeleteAuthorCommand> {
  async execute(cmd: DeleteAuthorCommand): Promise<void> {
    const author = await AuthorEntity.findOneBy({id: cmd.id});

    if (!author)
      throw new NotFoundException("Author with given id not found");

    await AuthorEntity.delete(cmd.id);
  }
}