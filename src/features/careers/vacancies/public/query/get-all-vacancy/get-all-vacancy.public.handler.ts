import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {GetAllVacancyPublicQuery} from "@/features/careers/vacancies/public/query/get-all-vacancy/get-all-vacancy.public.query";
import {GetAllVacancyPublicResponse} from "@/features/careers/vacancies/public/query/get-all-vacancy/get-all-vacancy.public.response";
import {VacanciesEntity} from "@/features/careers/vacancies/vacancies.entity";

@QueryHandler(GetAllVacancyPublicQuery)
export class GetAllVacancyPublicHandler implements IQueryHandler<GetAllVacancyPublicQuery> {
  async execute(query: GetAllVacancyPublicQuery): Promise<GetAllVacancyPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const vacancies = await VacanciesEntity.find({skip: skip, take: take});
    return plainToInstance(GetAllVacancyPublicResponse, vacancies, {excludeExtraneousValues: true});
  }
}