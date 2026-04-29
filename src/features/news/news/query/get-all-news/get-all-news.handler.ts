import {ICommandHandler, QueryHandler} from "@nestjs/cqrs";
import {CreateNewsResponse} from "../../commonds/create-news.commonds/create-news.response";
import {plainToInstance} from "class-transformer";
import {GetAllNewsCategoryQuery} from "@/features/news/news-categories/query/get-all-news-category/get-all-news-category.query";
import {GetAllNewsQuery} from "@/features/news/news/query/get-all-news/get-all-news.query";
import {NewsEntity} from "@/features/news/news/news.entity";
import {GetAllNewsResponse} from "@/features/news/news/query/get-all-news/get-all-news.response";

@QueryHandler(GetAllNewsCategoryQuery)
export class GetAllNewsHandler implements ICommandHandler<GetAllNewsQuery> {
  async execute(query: GetAllNewsQuery): Promise<GetAllNewsResponse[]> {
    const take = query.filters.size ?? 10
    const currentPage = query.filters.page ?? 1
    const skip = (currentPage - 1) * take

    const news = await NewsEntity.find({skip: skip, take: take})
    return plainToInstance(GetAllNewsResponse, news, {excludeExtraneousValues: true})
  }
}