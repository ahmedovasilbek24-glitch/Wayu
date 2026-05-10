import {Query} from "@nestjs/cqrs";
import {GetAllFaqsPublicResponse} from "@/features/support/faqs/public/query/get-all-faqs/get-all-faqs.public.response";
import {GetAllFaqsPublicFilters} from "@/features/support/faqs/public/query/get-all-faqs/get-all-faqs.public.filters";

export class GetAllFaqsPublicQuery extends Query<GetAllFaqsPublicResponse[]> {
  constructor(public filters: GetAllFaqsPublicFilters) {
    super();
  }
}