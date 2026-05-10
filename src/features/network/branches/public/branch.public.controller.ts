import {Controller, Get, Param, ParseIntPipe, Query} from "@nestjs/common";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {GetOneBranchPublicResponse} from "./query/get-one-branch/get-one-branch.public.response";
import {GetOneBranchPublicQuery} from "./query/get-one-branch/get-one-branch.public.query";
import {GetAllBranchesPublicResponse} from "@/features/network/branches/public/query/get-all-branch/get-all-branch.public.response";
import {GetAllBranchesPublicFilters} from "@/features/network/branches/public/query/get-all-branch/get-all-branch.public.filters";
import {GetAllBranchesPublicQuery} from "@/features/network/branches/public/query/get-all-branch/get-all-branch.public.query";

@Controller('public/branches')
@ApiTags('Branches-Public')
export class BranchesPublicController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({type: [GetAllBranchesPublicResponse]})
  async getAllBranches(@Query() filters: GetAllBranchesPublicFilters) {
    return await this.queryBus.execute(new GetAllBranchesPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({type: GetOneBranchPublicResponse})
  async getOneBranch(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneBranchPublicQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}