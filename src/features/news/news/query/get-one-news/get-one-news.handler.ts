import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetOneNewsQuery} from "@/features/news/news/query/get-one-news/get-one-news.query";
import {GetOneNewsResponse} from "@/features/news/news/query/get-one-news/get-one-news.response";
import {NewsEntity} from "@/features/news/news/news.entity";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";

@QueryHandler(GetOneNewsQuery)
export class GetOneNewsHandler implements IQueryHandler<GetOneNewsQuery> {
  async execute(query: GetOneNewsQuery): Promise<GetOneNewsResponse> {
    const news = await NewsEntity.findOneBy({id: query.id})
    if (!news) {
      throw new NotFoundException("News with given id not found")
    }

    return plainToInstance(GetOneNewsResponse, news, {excludeExtraneousValues: true})
  }
}