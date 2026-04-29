import {Query} from "@nestjs/cqrs";
import {GetAllNewsCategoryResponse} from "@/features/news/news-categories/query/get-all-news-category/get-all-news-catefory.response";
import {GetAllNewsCategoryFilters} from "@/features/news/news-categories/query/get-all-news-category/get-all-news-category-filters";

export class GetAllNewsCategoryQuery extends Query<GetAllNewsCategoryResponse[]> {
  constructor(public readonly filters: GetAllNewsCategoryFilters) {
    super();
  }
}