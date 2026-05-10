import {Query} from "@nestjs/cqrs";
import {GetAllRepresentativeResponse} from "@/features/network/representatives/admin/query/get-all-representative/get-all-representative.response";
import {GetAllRepresentativeFilters} from "@/features/network/representatives/admin/query/get-all-representative/get-all-representative.filters";

export class GetAllRepresentativeQuery extends Query<GetAllRepresentativeResponse[]> {
  constructor(public readonly filters: GetAllRepresentativeFilters) {
    super();
  }
}