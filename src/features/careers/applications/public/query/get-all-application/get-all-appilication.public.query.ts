import {Query} from "@nestjs/cqrs";
import {GetAllApplicationPublicResponse} from "@/features/careers/applications/public/query/get-all-application/get-all-appilication.public.response";
import {GetAllApplicationPublicFilters} from "@/features/careers/applications/public/query/get-all-application/get-all-appilication.public.filters";

export class GetAllApplicationPublicQuery extends Query<GetAllApplicationPublicResponse[]> {
  constructor(public filters: GetAllApplicationPublicFilters) {
    super();
  }
}