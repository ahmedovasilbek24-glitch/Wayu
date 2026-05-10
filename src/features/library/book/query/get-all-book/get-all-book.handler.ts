import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {BooksEntity} from "@/features/library/book/books.entity";
import {plainToInstance} from "class-transformer";
import {GetAllBookQuery} from "@/features/library/book/query/get-all-book/get-all-book.query";
import {GetAllBookResponse} from "@/features/library/book/query/get-all-book/get-all-book.response";

@QueryHandler(GetAllBookQuery)
export class GetAllBookHandler implements IQueryHandler<GetAllBookQuery> {
  async execute(query: GetAllBookQuery): Promise<GetAllBookResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const books = await BooksEntity.find({skip, take, relations: {book: true, category: true}});
    return plainToInstance(GetAllBookResponse, books, {excludeExtraneousValues: true});
  }
}