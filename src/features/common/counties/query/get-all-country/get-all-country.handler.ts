import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {GetAllCountryQuery} from "@/features/common/counties/query/get-all-country/get-all-country.query";
import {GetAllCountryResponse} from "@/features/common/counties/query/get-all-country/get-all-country.response";
import {CountriesEntity} from "@/features/common/counties/countries.entity";

@QueryHandler(GetAllCountryQuery)
export class GetAllCountryHandler implements IQueryHandler<GetAllCountryQuery> {
  async execute(query: GetAllCountryQuery): Promise<GetAllCountryResponse[]> {
    const take = query.filters.size ?? 10
    const currentPage = query.filters.page ?? 1
    const skip = (currentPage - 1) * take

    const country = await CountriesEntity.find({skip: skip, take: take})
    return plainToInstance(GetAllCountryResponse, country, {excludeExtraneousValues: true})
  }
}