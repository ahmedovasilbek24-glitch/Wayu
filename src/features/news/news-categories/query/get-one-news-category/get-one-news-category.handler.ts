import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetOneNewsCategoryQuery} from "@/features/news/news-categories/query/get-one-news-category/get-one-news-category.query";
import {GetOneNewsCategoryResponse} from "@/features/news/news-categories/query/get-one-news-category/get-one-news-category.response";
import {NewsCategoriesEntity} from "@/features/news/news-categories/newsCategories.entity";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetOneNewsCategoryQuery)
export class GetOneNewsCategoryHandler implements IQueryHandler<GetOneNewsCategoryQuery> {
  async execute(query: GetOneNewsCategoryQuery): Promise<GetOneNewsCategoryResponse> {
    const newsCategory = await NewsCategoriesEntity.findOneBy({id: query.id})
    if (!newsCategory) {
      throw new NotFoundException("Category with given id not found")
    }
    return plainToInstance(GetOneNewsCategoryResponse, newsCategory, {excludeExtraneousValues: true})
  }
}