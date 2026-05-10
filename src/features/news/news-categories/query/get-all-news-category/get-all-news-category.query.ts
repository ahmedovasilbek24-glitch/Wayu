import {Query} from "@nestjs/cqrs";
import {GetAllNewsCategoryFilters} from "@/features/news/news-categories/query/get-all-news-category/get-all-news-category-filters";
import {PaginatedResult} from "@/features/common/dto/pagination-result.dto";

export class GetAllNewsCategoryQuery extends Query<PaginatedResult> {
  constructor(public readonly filters: GetAllNewsCategoryFilters) {
    super();
  }
}