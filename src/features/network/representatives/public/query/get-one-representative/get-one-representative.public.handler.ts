import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetOneRepresentativePublicQuery} from "./get-one-representative.public.query";
import {GetOneRepresentativePublicResponse} from "./get-one-representative.public.response";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";
import {RepresentativesEntity} from "@/features/network/representatives/representatives.entity";

@QueryHandler(GetOneRepresentativePublicQuery)
export class GetOneRepresentativePublicHandler implements IQueryHandler<GetOneRepresentativePublicQuery>{
  async execute(query: GetOneRepresentativePublicQuery): Promise<GetOneRepresentativePublicResponse> {
    const representative = await RepresentativesEntity.findOneBy({id: query.id});

    if (!representative) {
      throw new NotFoundException("Representative not found");
    }

    return plainToInstance(GetOneRepresentativePublicResponse, representative, {excludeExtraneousValues: true});
  }
}