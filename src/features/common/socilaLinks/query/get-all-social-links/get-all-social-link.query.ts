import {Query} from "@nestjs/cqrs";
import {GetAllSocialLinkResponse} from "@/features/common/socilaLinks/query/get-all-social-links/get-all-social-link.response";
import {GetAllSocialLinkFilters} from "@/features/common/socilaLinks/query/get-all-social-links/get-all-social-link.filter";

export class GetAllSocialLinkQuery extends Query<GetAllSocialLinkResponse[]> {
  constructor(public readonly filters: GetAllSocialLinkFilters) {
    super();
  }
}