import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllRepresentativeQuery} from "./get-all-representative.query";
import {GetAllRepresentativeResponse} from "./get-all-representative.response";
import {plainToInstance} from "class-transformer";
import {RepresentativesEntity} from "@/features/network/representatives/representatives.entity";

@QueryHandler(GetAllRepresentativeQuery)
export class GetAllRepresentativeHandler implements IQueryHandler<GetAllRepresentativeQuery> {
  async execute(query: GetAllRepresentativeQuery): Promise<GetAllRepresentativeResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const representatives = await RepresentativesEntity.find({skip, take});
    return plainToInstance(GetAllRepresentativeResponse, representatives, {excludeExtraneousValues: true});
  }
}