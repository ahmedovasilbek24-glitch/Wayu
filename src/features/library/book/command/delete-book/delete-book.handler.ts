import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {BooksEntity} from "@/features/library/book/books.entity";
import {NotFoundException} from "@nestjs/common";
import {DeleteBookCommand} from "@/features/library/book/command/delete-book/delete-book.commond";

@CommandHandler(DeleteBookCommand)
export class DeleteBookHandler implements ICommandHandler<DeleteBookCommand> {
  async execute(command: DeleteBookCommand): Promise<void> {
    const exists = await BooksEntity.existsBy({id: command.id});

    if (!exists)
      throw new NotFoundException("Book with given id not found");

    await BooksEntity.delete({id: command.id});
  }
}