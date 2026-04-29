import {plainToInstance} from "class-transformer";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllNewsCategoryQuery} from "@/features/news/news-categories/query/get-all-news-category/get-all-news-category.query";
import {GetAllNewsCategoryResponse} from "@/features/news/news-categories/query/get-all-news-category/get-all-news-catefory.response";
import {NewsCategoriesEntity} from "@/features/news/news-categories/newsCategories.entity";

@QueryHandler(GetAllNewsCategoryQuery)
export class GetAllNewsCategoryHandler implements IQueryHandler<GetAllNewsCategoryQuery> {
  async execute(query: GetAllNewsCategoryQuery): Promise<GetAllNewsCategoryResponse[]> {
    const take = query.filters.size ?? 10
    const currentPage = query.filters.page ?? 1
    const skip = (currentPage - 1) * take

    const newsCategory = await NewsCategoriesEntity.find({skip: skip, take: take})
    return plainToInstance(GetAllNewsCategoryResponse, newsCategory, {excludeExtraneousValues: true})
  }
}
