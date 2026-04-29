import {CreateNewsCategoryCommands} from './create-news-category.commands';
import {CreateNewsCategoryResponse} from "./create-news-category.response";
import {NewsCategoriesEntity} from "@/features/news/news-categories/newsCategories.entity";
import {ILike} from "typeorm";
import {BadRequestException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";

@CommandHandler(CreateNewsCategoryCommands)
export class CreateNewsCategoryHandler implements ICommandHandler<CreateNewsCategoryCommands>{
  async execute(command: CreateNewsCategoryCommands): Promise<CreateNewsCategoryResponse> {
    const alreadyExists = await NewsCategoriesEntity.existsBy({title: ILike(command.title)});

    if (alreadyExists)
      throw new BadRequestException("Category already exists");

    const newNewsCategory = NewsCategoriesEntity.create({title: command.title} as NewsCategoriesEntity);
    await NewsCategoriesEntity.save(newNewsCategory);
    return plainToInstance(CreateNewsCategoryResponse, newNewsCategory, {excludeExtraneousValues: true})
  }
}