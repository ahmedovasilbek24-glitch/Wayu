import {Query} from "@nestjs/cqrs";
import {GetAllFaqsResponse} from "@/features/support/faqs/admin/query/get-all-faqs/get-all-faqs.response";
import {GetAllFaqsFilters} from "@/features/support/faqs/admin/query/get-all-faqs/get-all-faqs.filters";

export class GetAllFaqsQuery extends Query<GetAllFaqsResponse[]> {
  constructor(public filters: GetAllFaqsFilters) {
    super();
  }
}