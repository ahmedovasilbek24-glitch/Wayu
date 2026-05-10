import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {GetAllApplicationQuery} from "@/features/careers/applications/admin/query/get-all-applications/get-all-applications.query";
import {GetAllApplicationResponse} from "@/features/careers/applications/admin/query/get-all-applications/get-all-applications.response";
import {ApplicationsEntity} from "@/features/careers/applications/applications.entity";

@QueryHandler(GetAllApplicationQuery)
export class GetAllApplicationHandler implements IQueryHandler<GetAllApplicationQuery> {
  async execute(query: GetAllApplicationQuery): Promise<GetAllApplicationResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const applications = await ApplicationsEntity.find({skip: skip, take: take});
    return plainToInstance(GetAllApplicationResponse, applications, {excludeExtraneousValues: true});
  }
}