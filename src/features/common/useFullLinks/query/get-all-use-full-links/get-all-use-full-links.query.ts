import {Query} from "@nestjs/cqrs";
import {GetAllUsefulLinkFilters} from "@/features/common/useFullLinks/query/get-all-use-full-links/get-all-use-full-links.filters";
import {GetAllUseFullLinkResponse} from "@/features/common/useFullLinks/query/get-all-use-full-links/get-all-use-full-links.response";

export class GetAllUsefulLinkQuery extends Query<GetAllUseFullLinkResponse[]> {
  constructor(public readonly filters: GetAllUsefulLinkFilters) {
    super();
  }
}