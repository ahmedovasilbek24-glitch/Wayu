import {Query} from "@nestjs/cqrs";
import {GetAllLanguageResponse} from "@/features/common/language/query/get-all-language/get-all-language.response";
import {GetAllLanguageFilters} from "@/features/common/language/query/get-all-language/get-all-language.filters";

export class GetAllLanguageQuery extends Query<GetAllLanguageResponse[]> {
  constructor(public readonly filters: GetAllLanguageFilters) {
    super();
  }
}