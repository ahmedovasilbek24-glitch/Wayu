import {plainToInstance} from "class-transformer";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllNewsCategoryQuery} from "@/features/news/news-categories/query/get-all-news-category/get-all-news-category.query";
import {GetAllNewsCategoryResponse} from "@/features/news/news-categories/query/get-all-news-category/get-all-news-catefory.response";
import {NewsCategoriesEntity} from "@/features/news/news-categories/newsCategories.entity";
import {Inject} from "@nestjs/common";
import {CACHE_MANAGER, Cache} from "@nestjs/cache-manager";
import {PaginatedResult} from "@/features/common/dto/pagination-result.dto";

@QueryHandler(GetAllNewsCategoryQuery)
export class GetAllNewsCategoryHandler implements IQueryHandler<GetAllNewsCategoryQuery> {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache,
  ) {
  }

  async execute(query: GetAllNewsCategoryQuery): Promise<PaginatedResult> {
    const take = query.filters.size ?? 10
    const currentPage = query.filters.page ?? 1
    const cachedPayload = await this.cache.get<PaginatedResult>(`category: ${currentPage}:${take}`);
    if (cachedPayload) {
      return cachedPayload;
    }
    const skip = (currentPage - 1) * take

    const totalCount = await NewsCategoriesEntity.count();
    const totalPages = Math.ceil(totalCount / take);
    const previousPage = currentPage > 1 ? currentPage - 1 : 1;
    const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;


    const newsCategory = await NewsCategoriesEntity.find({skip: skip, take: take})
    const data = plainToInstance(GetAllNewsCategoryResponse, newsCategory, {excludeExtraneousValues: true})
    const payload = {totalPages, totalCount, previousPage, currentPage, nextPage, data} as PaginatedResult;
    await this.cache.set(`category: ${currentPage}: ${take}`, payload);
    await this.cache.clear();
    return payload;
  }
}
