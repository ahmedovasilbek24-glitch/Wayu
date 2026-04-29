import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteNewsCategoryCommands} from "@/features/news/news-categories/commonds/delete-news-category/delete-news-category.commands";
import {NewsCategoriesEntity} from "@/features/news/news-categories/newsCategories.entity";
import {BadRequestException, NotFoundException} from "@nestjs/common";
import {NewsEntity} from "@/features/news/news/news.entity";

@CommandHandler(DeleteNewsCategoryCommands)
export class DeleteNewsCategoryHandler implements ICommandHandler<DeleteNewsCategoryCommands> {
  async execute(cmd: DeleteNewsCategoryCommands): Promise<void> {
    const category = await NewsCategoriesEntity.findOneBy({id: cmd.id})
    if (!category) {
      throw new NotFoundException("Category with given id not found")
    }

    const hasAnyAttachedNews = await NewsEntity.existsBy({categoryId: cmd.id})
    if (hasAnyAttachedNews) {
      throw new BadRequestException("Category has attached News more or delete them first")
    }

    await NewsCategoriesEntity.remove(category)
  }
}