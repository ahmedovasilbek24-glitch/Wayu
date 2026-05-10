import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {BookCategoriesEntity} from "@/features/library/book-category/bookCategories.entity";
import {BadRequestException} from "@nestjs/common";
import {ILike} from "typeorm";
import {plainToInstance} from "class-transformer";
import {CreateBookCategoryCommand} from "@/features/library/book-category/command/create-book-category/create-book-category.command";
import {CreateBookCategoryResponse} from "@/features/library/book-category/command/create-book-category/create-book-category.response";

@CommandHandler(CreateBookCategoryCommand)
export class CreateBookCategoryHandler implements ICommandHandler<CreateBookCategoryCommand> {
  async execute(command: CreateBookCategoryCommand): Promise<CreateBookCategoryResponse> {
    const alreadyExists = await BookCategoriesEntity.existsBy({title: ILike(command.title)});

    if (alreadyExists)
      throw new BadRequestException("Book category already exists");

    const category = BookCategoriesEntity.create({title: command.title} as BookCategoriesEntity);
    await BookCategoriesEntity.save(category);
    return plainToInstance(CreateBookCategoryResponse, category, {excludeExtraneousValues: true});
  }
}