import {Query} from "@nestjs/cqrs";
import {GetAllRepresentativePublicResponse} from "./get-all-representative.public.response";
import {GetAllRepresentativePublicFilters} from "@/features/network/representatives/public/query/get-all-representative/get-all-representative.public.filters";

export class GetAllRepresentativePublicQuery extends Query<GetAllRepresentativePublicResponse[]>{
  constructor(public readonly filters: GetAllRepresentativePublicFilters) {
    super();
  }
}