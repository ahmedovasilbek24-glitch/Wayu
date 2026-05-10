import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {BranchesEntity} from "@/features/network/branches/branches.entity";
import {plainToInstance} from "class-transformer";
import {GetAllBranchesPublicQuery} from "@/features/network/branches/public/query/get-all-branch/get-all-branch.public.query";
import {GetAllBranchesPublicResponse} from "@/features/network/branches/public/query/get-all-branch/get-all-branch.public.response";

@QueryHandler(GetAllBranchesPublicQuery)
export class GetAllBranchesPublicHandler implements IQueryHandler<GetAllBranchesPublicQuery>{
  async execute(query: GetAllBranchesPublicQuery): Promise<GetAllBranchesPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1
    const skip = query.filters?.page ? (currentPage - 1) * take : 0;

    const branches = await BranchesEntity.find({
      take,
      skip,
      order: {createdAt: 'DESC'}
    });

    return plainToInstance(GetAllBranchesPublicResponse, branches, {excludeExtraneousValues: true});
  }
}