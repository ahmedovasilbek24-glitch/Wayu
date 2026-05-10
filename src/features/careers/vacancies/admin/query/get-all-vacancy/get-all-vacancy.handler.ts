import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {GetAllVacancyQuery} from "@/features/careers/vacancies/admin/query/get-all-vacancy/get-all-vacancy.query";
import {GetAllVacancyResponse} from "@/features/careers/vacancies/admin/query/get-all-vacancy/get-all-vacancy.response";
import {VacanciesEntity} from "@/features/careers/vacancies/vacancies.entity";

@QueryHandler(GetAllVacancyQuery)
export class GetAllVacancyHandler implements IQueryHandler<GetAllVacancyQuery> {
  async execute(query: GetAllVacancyQuery): Promise<GetAllVacancyResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const vacancies = await VacanciesEntity.find({skip: skip, take: take});
    return plainToInstance(GetAllVacancyResponse, vacancies, {excludeExtraneousValues: true});
  }
}