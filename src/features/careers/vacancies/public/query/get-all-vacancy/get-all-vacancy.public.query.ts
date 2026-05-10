import {Query} from "@nestjs/cqrs";
import {GetAllVacancyPublicResponse} from "@/features/careers/vacancies/public/query/get-all-vacancy/get-all-vacancy.public.response";
import {GetAllVacancyPublicFilters} from "@/features/careers/vacancies/public/query/get-all-vacancy/get-all-vacancy.public.filters";

export class GetAllVacancyPublicQuery extends Query<GetAllVacancyPublicResponse[]> {
  constructor(public readonly filters: GetAllVacancyPublicFilters) {
    super();
  }
}