import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {CreateFaqsResponse} from "@/features/support/faqs/admin/command/create-faqs/create-faqs.response";
import {CreateFaqsRequest} from "@/features/support/faqs/admin/command/create-faqs/create-faqs.request";
import {CreateFaqsCommand} from "@/features/support/faqs/admin/command/create-faqs/create-faqs.command";
import {GetAllFaqsResponse} from "@/features/support/faqs/admin/query/get-all-faqs/get-all-faqs.response";
import {GetAllFaqsFilters} from "@/features/support/faqs/admin/query/get-all-faqs/get-all-faqs.filters";
import {GetAllFaqsQuery} from "@/features/support/faqs/admin/query/get-all-faqs/get-all-faqs.query";
import {GetOneFaqsResponse} from "@/features/support/faqs/admin/query/get-one-faqs/get-one-faqs.response";
import {GetOneFaqsQuery} from "@/features/support/faqs/admin/query/get-one-faqs/get-one-faqs.query";
import {DeleteFaqsCommand} from "@/features/support/faqs/admin/command/delete-faqs/delete-faqs.command";
import {UpdateFaqsRequest} from "@/features/support/faqs/admin/command/update-faqs/update-faqs.request";
import {UpdateFaqsCommand} from "@/features/support/faqs/admin/command/update-faqs/update-faqs.command";
import {UpdateFaqsResponse} from "@/features/support/faqs/admin/command/update-faqs/update-faqs.response";

@Controller('admin/faq')
@ApiTags('FAQ')
export class FaqsAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({type: CreateFaqsResponse})
  async createFaq(@Body() payload: CreateFaqsRequest) {
    return await this.commandBus.execute(new CreateFaqsCommand(payload.question, payload.answer));
  }

  @Get()
  @ApiOkResponse({type: [GetAllFaqsResponse]})
  async getAllFaqs(@Query() filters: GetAllFaqsFilters) {
    return await this.queryBus.execute(new GetAllFaqsQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({type: GetOneFaqsResponse})
  async getOneFaq(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneFaqsQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  async deleteFaq(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteFaqsCommand(id));
  }

  @Patch(':id')
  @ApiOkResponse({type: UpdateFaqsResponse})
  async updateFaq(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateFaqsRequest) {
    return await this.commandBus.execute(new UpdateFaqsCommand(id, payload.question, payload.answer));
  }
}