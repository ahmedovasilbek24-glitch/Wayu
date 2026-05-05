import {Query} from "@nestjs/cqrs";
import {GetAllCountryResponse} from "@/features/common/counties/query/get-all-country/get-all-country.response";
import {GetAllCountryFilters} from "@/features/common/counties/query/get-all-country/get-all-country.filters";

export class GetAllCountryQuery extends Query<GetAllCountryResponse[]> {
  constructor(public readonly filters: GetAllCountryFilters) {
    super();
  }
}