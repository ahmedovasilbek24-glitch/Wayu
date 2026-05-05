import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {UpdateNewsCategoryCommands} from "@/features/news/news-categories/commonds/update-news-category/update-news-category.commands";
import {UpdateNewsCategoryResponse} from "@/features/news/news-categories/commonds/update-news-category/update-news-category.response";
import {NewsCategoriesEntity} from "@/features/news/news-categories/newsCategories.entity";

@CommandHandler(UpdateNewsCategoryCommands)
export class UpdateNewsCategoryHandler implements ICommandHandler<UpdateNewsCategoryCommands> {
  async execute(command: UpdateNewsCategoryCommands): Promise<UpdateNewsCategoryResponse> {
    const newsCategory = await NewsCategoriesEntity.findOneBy({id: command.id})
    if (!newsCategory) {
      throw new NotFoundException('Category with given id not found')
    }

    Object.assign(
      newsCategory,
      Object.fromEntries(
        Object.entries(command).filter(([key, value]) => value)
      )
    )

    await NewsCategoriesEntity.save(newsCategory)
    return plainToInstance(UpdateNewsCategoryResponse, newsCategory, {excludeExtraneousValues: true})
  }
}