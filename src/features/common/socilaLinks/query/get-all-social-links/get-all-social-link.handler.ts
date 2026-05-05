import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {GetAllSocialLinkQuery} from "@/features/common/socilaLinks/query/get-all-social-links/get-all-social-link.query";
import {GetAllSocialLinkResponse} from "@/features/common/socilaLinks/query/get-all-social-links/get-all-social-link.response";
import {SocialLinksEntity} from "@/features/common/socilaLinks/socialLinks.entity";

@QueryHandler(GetAllSocialLinkQuery)
export class GetAllSocialLinkHandler implements IQueryHandler<GetAllSocialLinkQuery> {
  async execute(query: GetAllSocialLinkQuery): Promise<GetAllSocialLinkResponse[]> {
    const take = query.filters.size ?? 10
    const currentPage = query.filters.page ?? 1
    const skip = (currentPage - 1) * take

    const links = await SocialLinksEntity.find({skip: skip, take: take})
    return plainToInstance(GetAllSocialLinkResponse, links, {excludeExtraneousValues: true})
  }
}