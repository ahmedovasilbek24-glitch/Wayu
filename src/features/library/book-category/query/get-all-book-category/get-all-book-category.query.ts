import {Query} from "@nestjs/cqrs";
import {GetAllBookCategoryFilters} from "@/features/library/book-category/query/get-all-book-category/get-all-book-category.filters";
import {GetAllBookCategoryResponse} from "@/features/library/book-category/query/get-all-book-category/get-all-book-category.response";

export class GetAllBookCategoryQuery extends Query<GetAllBookCategoryResponse[]> {
  constructor(public readonly filters: GetAllBookCategoryFilters) {
    super();
  }
}