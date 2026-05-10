import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {BooksEntity} from "@/features/library/book/books.entity";
import {BookCategoriesEntity} from "@/features/library/book-category/bookCategories.entity";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {CreateBookCommand} from "@/features/library/book/command/create-book/create-book.commond";
import {CreateBookResponse} from "@/features/library/book/command/create-book/create-book.response";
import {AuthorEntity} from "@/features/library/author/author.entity";

@CommandHandler(CreateBookCommand)
export class CreateBookHandler implements ICommandHandler<CreateBookCommand> {
  async execute(command: CreateBookCommand): Promise<CreateBookResponse> {
    const authorExists = await AuthorEntity.existsBy({id: command.authorId});

    if (!authorExists)
      throw new NotFoundException("Author with given id not found");

    const categoryExists = await BookCategoriesEntity.existsBy({id: command.categoryId});

    if (!categoryExists)
      throw new NotFoundException("Book category with given id not found");

    const book = BooksEntity.create({
      authorId: command.authorId,
      categoryId: command.categoryId,
      title: command.title,
      image: command.image.path,
      file: command.file.path,
      pages: command.pages,
      year: command.year,
      description: command.description,
    }) as BooksEntity;
    await BooksEntity.save(book);
    return plainToInstance(CreateBookResponse, book, {excludeExtraneousValues: true});
  }
}