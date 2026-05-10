import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {BookCategoriesEntity} from "@/features/library/book-category/bookCategories.entity";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {GetOneBookCategoryResponse} from "@/features/library/book-category/query/get-one-book-category/get-one-book-category.response";
import {GetOneBookCategoryQuery} from "@/features/library/book-category/query/get-one-book-category/get-one-book-category.request";

@QueryHandler(GetOneBookCategoryQuery)
export class GetOneBookCategoryHandler implements IQueryHandler<GetOneBookCategoryQuery> {
  async execute(query: GetOneBookCategoryQuery): Promise<GetOneBookCategoryResponse> {
    const category = await BookCategoriesEntity.findOneBy({id: query.id});
    if (!category) throw new NotFoundException("Book category with given id not found");
    return plainToInstance(GetOneBookCategoryResponse, category, {excludeExtraneousValues: true});
  }
}