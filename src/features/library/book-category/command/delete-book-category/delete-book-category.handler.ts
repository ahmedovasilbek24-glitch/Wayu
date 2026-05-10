import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {BookCategoriesEntity} from "@/features/library/book-category/bookCategories.entity";
import {NotFoundException} from "@nestjs/common";
import {DeleteBookCategoryCommand} from "@/features/library/book-category/command/delete-book-category/delete-book-category.command";

@CommandHandler(DeleteBookCategoryCommand)
export class DeleteBookCategoryHandler implements ICommandHandler<DeleteBookCategoryCommand> {
  async execute(cmd: DeleteBookCategoryCommand): Promise<void> {
    const category = await BookCategoriesEntity.findOneBy({id: cmd.id});

    if (!category)
      throw new NotFoundException("Book category with given id not found");

    await BookCategoriesEntity.delete(cmd.id);
  }
}