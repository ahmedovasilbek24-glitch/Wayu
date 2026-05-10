import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetOneBranchPublicQuery} from "./get-one-branch.public.query";
import {GetOneBranchPublicResponse} from "./get-one-branch.public.response";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";
import {BranchesEntity} from "@/features/network/branches/branches.entity";

@QueryHandler(GetOneBranchPublicQuery)
export class GetOneBranchPublicHandler implements IQueryHandler<GetOneBranchPublicQuery>{
  async execute(query: GetOneBranchPublicQuery): Promise<GetOneBranchPublicResponse> {
    const branch = await BranchesEntity.findOneBy({id: query.id});

    if (!branch) {
      throw new NotFoundException("Branch not found");
    }

    return plainToInstance(GetOneBranchPublicResponse, branch, {excludeExtraneousValues: true});
  }
}