import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {BranchesEntity} from "@/features/network/branches/branches.entity";
import {plainToInstance} from "class-transformer";
import {GetAllBranchQuery} from "@/features/network/branches/admin/query/get-all-branches/get-all-brach.query";
import {GetAllBranchResponse} from "@/features/network/branches/admin/query/get-all-branches/get-all-brach.response";

@QueryHandler(GetAllBranchQuery)
export class GetAllBranchHandler implements IQueryHandler<GetAllBranchQuery> {
  async execute(query: GetAllBranchQuery): Promise<GetAllBranchResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const branches = await BranchesEntity.find({
      skip,
      take,
      relations: ['country', 'representative'],
    });
    return plainToInstance(GetAllBranchResponse, branches, {excludeExtraneousValues: true});
  }
}