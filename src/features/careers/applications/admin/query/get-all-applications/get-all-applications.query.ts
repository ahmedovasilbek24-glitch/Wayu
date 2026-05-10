import {Query} from "@nestjs/cqrs";
import {GetAllApplicationFilters} from "@/features/careers/applications/admin/query/get-all-applications/get-all-applications.filters";
import {GetAllApplicationResponse} from "@/features/careers/applications/admin/query/get-all-applications/get-all-applications.response";

export class GetAllApplicationQuery extends Query<GetAllApplicationResponse[]> {
  constructor(public filters: GetAllApplicationFilters) {
    super();
  }
}