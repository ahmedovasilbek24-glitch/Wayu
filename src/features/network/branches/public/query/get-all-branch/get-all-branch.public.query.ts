import {Query} from "@nestjs/cqrs";
import {GetAllBranchesPublicResponse} from "@/features/network/branches/public/query/get-all-branch/get-all-branch.public.response";
import {GetAllBranchesPublicFilters} from "@/features/network/branches/public/query/get-all-branch/get-all-branch.public.filters";

export class GetAllBranchesPublicQuery extends Query<GetAllBranchesPublicResponse[]>{
  constructor(public readonly filters: GetAllBranchesPublicFilters) {
    super();
  }
}