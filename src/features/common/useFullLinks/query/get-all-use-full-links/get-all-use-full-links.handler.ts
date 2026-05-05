import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {GetAllUsefulLinkQuery} from "@/features/common/useFullLinks/query/get-all-use-full-links/get-all-use-full-links.query";
import {GetAllUseFullLinkResponse} from "@/features/common/useFullLinks/query/get-all-use-full-links/get-all-use-full-links.response";
import {UseFullLinksEntity} from "@/features/common/useFullLinks/useFullLinks.entity";

@QueryHandler(GetAllUsefulLinkQuery)
export class GetAllUsefulLinkHandler implements IQueryHandler<GetAllUsefulLinkQuery> {
  async execute(query: GetAllUsefulLinkQuery): Promise<GetAllUseFullLinkResponse[]> {
    const take = query.filters.size ?? 10
    const currentPage = query.filters.page ?? 1
    const skip = (currentPage - 1) * take

    const links = await UseFullLinksEntity.find({skip: skip, take: take})
    return plainToInstance(GetAllUseFullLinkResponse, links, {excludeExtraneousValues: true})
  }
}