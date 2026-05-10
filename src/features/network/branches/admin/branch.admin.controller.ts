import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {CreateBranchResponse} from "@/features/network/branches/admin/command/create-branches/create-branch.response";
import {CreateBranchRequest} from "@/features/network/branches/admin/command/create-branches/create-branch.request";
import {CreateBranchCommand} from "@/features/network/branches/admin/command/create-branches/create-branch.command";
import {GetAllBranchResponse} from "@/features/network/branches/admin/query/get-all-branches/get-all-brach.response";
import {GetAllBranchFilters} from "@/features/network/branches/admin/query/get-all-branches/get-all-brach.filters";
import {GetAllBranchQuery} from "@/features/network/branches/admin/query/get-all-branches/get-all-brach.query";
import {GetOneBranchResponse} from "@/features/network/branches/admin/query/get-one-branchens/get-one-branch.response";
import {GetOneBranchQuery} from "@/features/network/branches/admin/query/get-one-branchens/get-one-branch.query";
import {DeleteBranchCommand} from "@/features/network/branches/admin/command/delete-branches/delete-branch.command";
import {UpdateBranchResponse} from "@/features/network/branches/admin/command/update-branches/update-brach.response";
import {UpdateBranchCommand} from "@/features/network/branches/admin/command/update-branches/update-brach.command";
import {UpdateBranchRequest} from "@/features/network/branches/admin/command/update-branches/update-brach.request";

@Controller('admin/branch')
@ApiTags('Branch')
export class BranchAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({type: CreateBranchResponse})
  async createBranch(@Body() payload: CreateBranchRequest) {
    return await this.commandBus.execute(new CreateBranchCommand(
      payload.countryId,
      payload.representativeId,
      payload.city,
      payload.latitude,
      payload.longitude,
      payload.phoneNumber,
    ));
  }

  @Get()
  @ApiOkResponse({type: [GetAllBranchResponse]})
  async getAllBranches(@Query() filters: GetAllBranchFilters) {
    return await this.queryBus.execute(new GetAllBranchQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({type: GetOneBranchResponse})
  async getOneBranch(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneBranchQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  async deleteBranch(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteBranchCommand(id));
  }

  @Patch(':id')
  @ApiOkResponse({type: UpdateBranchResponse})
  async updateBranch(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateBranchRequest) {
    return await this.commandBus.execute(new UpdateBranchCommand(
      id,
      payload.countryId,
      payload.representativeId,
      payload.city,
      payload.latitude,
      payload.longitude,
      payload.phoneNumber,
    ));
  }
}