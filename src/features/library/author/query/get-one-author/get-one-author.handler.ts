import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {GetOneAuthorQuery} from "@/features/library/author/query/get-one-author/get-one-author.request";
import {GetOneAuthorResponse} from "@/features/library/author/query/get-one-author/get-one-author.response";
import {AuthorEntity} from "@/features/library/author/author.entity";

@QueryHandler(GetOneAuthorQuery)
export class GetOneAuthorHandler implements IQueryHandler<GetOneAuthorQuery> {
  async execute(query: GetOneAuthorQuery): Promise<GetOneAuthorResponse> {
    const author = await AuthorEntity.findOneBy({id: query.id});

    if (!author)
      throw new NotFoundException("Author with given id not found");

    return plainToInstance(GetOneAuthorResponse, author, {excludeExtraneousValues: true});
  }
}