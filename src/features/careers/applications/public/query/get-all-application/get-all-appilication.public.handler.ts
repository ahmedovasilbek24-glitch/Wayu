import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {GetAllApplicationPublicQuery} from "@/features/careers/applications/public/query/get-all-application/get-all-appilication.public.query";
import {GetAllApplicationPublicResponse} from "@/features/careers/applications/public/query/get-all-application/get-all-appilication.public.response";
import {ApplicationsEntity} from "@/features/careers/applications/applications.entity";

@QueryHandler(GetAllApplicationPublicQuery)
export class GetAllApplicationPublicHandler implements IQueryHandler<GetAllApplicationPublicQuery> {
  async execute(query: GetAllApplicationPublicQuery): Promise<GetAllApplicationPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const applications = await ApplicationsEntity.find({skip: skip, take: take});
    return plainToInstance(GetAllApplicationPublicResponse, applications, {excludeExtraneousValues: true});
  }
}