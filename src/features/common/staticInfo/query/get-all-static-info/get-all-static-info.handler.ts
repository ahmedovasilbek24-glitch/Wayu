import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {GetAllStaticInfoQuery} from "@/features/common/staticInfo/query/get-all-static-info/get-all-static-info.query";
import {GetAllStaticInfoResponse} from "@/features/common/staticInfo/query/get-all-static-info/get-all-static-info.response";
import {StaticInfoEntity} from "@/features/common/staticInfo/staticInfo.entity";

@QueryHandler(GetAllStaticInfoQuery)
export class GetAllStaticInfoHandler implements IQueryHandler<GetAllStaticInfoQuery> {
  async execute(query: GetAllStaticInfoQuery): Promise<GetAllStaticInfoResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const items = await StaticInfoEntity.find({skip, take});
    return plainToInstance(GetAllStaticInfoResponse, items, {excludeExtraneousValues: true});
  }
}