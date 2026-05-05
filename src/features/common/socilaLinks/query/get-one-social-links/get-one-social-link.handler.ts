import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {GetOneSocialLinkQuery} from "@/features/common/socilaLinks/query/get-one-social-links/get-one-social-link.query";
import {GetOneSocialLinkResponse} from "@/features/common/socilaLinks/query/get-one-social-links/get-one-social-link.response";
import {SocialLinksEntity} from "@/features/common/socilaLinks/socialLinks.entity";

@QueryHandler(GetOneSocialLinkQuery)
export class GetOneSocialLinkHandler implements IQueryHandler<GetOneSocialLinkQuery> {
  async execute(query: GetOneSocialLinkQuery): Promise<GetOneSocialLinkResponse> {
    const links = await SocialLinksEntity.findOneBy({id: query.id})
    if (!links) {
      throw new NotFoundException('links with given id not found')
    }
    return plainToInstance(GetOneSocialLinkResponse, links, {excludeExtraneousValues: true})
  }
}