import {Query} from "@nestjs/cqrs";
import {GetAllBranchResponse} from "@/features/network/branches/admin/query/get-all-branches/get-all-brach.response";
import {GetAllBranchFilters} from "@/features/network/branches/admin/query/get-all-branches/get-all-brach.filters";

export class GetAllBranchQuery extends Query<GetAllBranchResponse[]> {
  constructor(public readonly filters: GetAllBranchFilters) {
    super();
  }
}