import {IQueryHandler, QueryHandler} from "@nestjs/cqrs"
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {GetOneCountryQuery} from "@/features/common/counties/query/get-one-country/get-one-country.query";
import {GetOneCountryResponse} from "@/features/common/counties/query/get-one-country/get-one-country.response";
import {CountriesEntity} from "@/features/common/counties/countries.entity";

@QueryHandler(GetOneCountryQuery)
export class GetOneCountryHandler implements IQueryHandler<GetOneCountryQuery> {
  async execute(query: GetOneCountryQuery): Promise<GetOneCountryResponse> {
    const country = await CountriesEntity.findOneBy({id: query.id})
    if (!country) {
      throw new NotFoundException('country with given id not found')
    }
    return plainToInstance(GetOneCountryResponse, country, {excludeExtraneousValues: true})
  }
}