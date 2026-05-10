import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {BooksEntity} from "@/features/library/book/books.entity";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {GetOneBookQuery} from "@/features/library/book/query/get-one-book/get-one-book.request";
import {GetOneBookResponse} from "@/features/library/book/query/get-one-book/get-one-book.response";

@QueryHandler(GetOneBookQuery)
export class GetOneBookHandler implements IQueryHandler<GetOneBookQuery> {
  async execute(query: GetOneBookQuery): Promise<GetOneBookResponse> {
    const book = await BooksEntity.findOne({where: {id: query.id}, relations: {book: true, category: true}});

    if (!book)
      throw new NotFoundException("Book with given id not found");

    return plainToInstance(GetOneBookResponse, book, {excludeExtraneousValues: true});
  }
}