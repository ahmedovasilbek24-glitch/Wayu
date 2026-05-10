import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {GetAllAuthorQuery} from "@/features/library/author/query/get-all-author/get-all-author.query";
import {GetAllAuthorResponse} from "@/features/library/author/query/get-all-author/get-all-author.response";
import {AuthorEntity} from "@/features/library/author/author.entity";

@QueryHandler(GetAllAuthorQuery)
export class GetAllAuthorHandler implements IQueryHandler<GetAllAuthorQuery> {
  async execute(query: GetAllAuthorQuery): Promise<GetAllAuthorResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const authors = await AuthorEntity.find({skip, take});
    return plainToInstance(GetAllAuthorResponse, authors, {excludeExtraneousValues: true});
  }
}