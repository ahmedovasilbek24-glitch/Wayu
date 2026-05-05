import {Query} from "@nestjs/cqrs";
import {GetAllTagsResponse} from "@/features/common/tags/query/get-all-tags/get-all-tags.response";
import {GetAllTagsFilters} from "@/features/common/tags/query/get-all-tags/get-all-tags.filters";

export class GetAllTagsQuery extends Query<GetAllTagsResponse[]> {
  constructor(public readonly filters: GetAllTagsFilters) {
    super();
  }
}