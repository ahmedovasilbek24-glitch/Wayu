import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {GetOneStaticInfoQuery} from "@/features/common/staticInfo/query/get-one-static-info/get-one-static-info.query";
import {GetOneStaticInfoResponse} from "@/features/common/staticInfo/query/get-one-static-info/get-one-static-info.response";
import {StaticInfoEntity} from "@/features/common/staticInfo/staticInfo.entity";

@QueryHandler(GetOneStaticInfoQuery)
export class GetOneStaticInfoHandler implements IQueryHandler<GetOneStaticInfoQuery> {
  async execute(query: GetOneStaticInfoQuery): Promise<GetOneStaticInfoResponse> {
    const staticInfo = await StaticInfoEntity.findOneBy({id: query.id});

    if (!staticInfo)
      throw new NotFoundException("Static info with given id not found");

    return plainToInstance(GetOneStaticInfoResponse, staticInfo, {excludeExtraneousValues: true});
  }
}