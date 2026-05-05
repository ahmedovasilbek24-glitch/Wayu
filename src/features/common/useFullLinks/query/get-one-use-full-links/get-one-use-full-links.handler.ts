import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {GetOneUsefulLinkQuery} from "@/features/common/useFullLinks/query/get-one-use-full-links/get-one-use-full-links.query";
import {GetOneUseFullLinksResponse} from "@/features/common/useFullLinks/query/get-one-use-full-links/get-one-use-full-links.response";
import {UseFullLinksEntity} from "@/features/common/useFullLinks/useFullLinks.entity";
@QueryHandler(GetOneUsefulLinkQuery)
export class GetOneUsefulLinkHandler implements IQueryHandler<GetOneUsefulLinkQuery> {
  async execute(query: GetOneUsefulLinkQuery): Promise<GetOneUseFullLinksResponse> {
    const links = await UseFullLinksEntity.findOneBy({id: query.id})
    if (!links) {
      throw new NotFoundException('links with given id not found')
    }
    return plainToInstance(GetOneUseFullLinksResponse, links, {excludeExtraneousValues: true})
  }
}