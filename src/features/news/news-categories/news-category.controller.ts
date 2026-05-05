import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {GetAllNewsCategoryQuery} from "./query/get-all-news-category/get-all-news-category.query";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {GetAllNewsCategoryFilters} from "@/features/news/news-categories/query/get-all-news-category/get-all-news-category-filters";
import {GetAllNewsCategoryResponse} from "@/features/news/news-categories/query/get-all-news-category/get-all-news-catefory.response";
import {GetOneNewsCategoryResponse} from "@/features/news/news-categories/query/get-one-news-category/get-one-news-category.response";
import {GetOneNewsCategoryQuery} from "@/features/news/news-categories/query/get-one-news-category/get-one-news-category.query";
import {CreateNewsCategoryResponse} from "@/features/news/news-categories/commonds/create-news-category.commonds/create-news-category.response";
import {CreateNewsCategoryCommands} from "@/features/news/news-categories/commonds/create-news-category.commonds/create-news-category.commands";
import {DeleteNewsCategoryCommands} from "@/features/news/news-categories/commonds/delete-news-category/delete-news-category.commands";
import {UpdateNewsCategoryResponse} from "@/features/news/news-categories/commonds/update-news-category/update-news-category.response";
import {UpdateNewsCategoryCommands} from "@/features/news/news-categories/commonds/update-news-category/update-news-category.commands";

@Controller('admin/news-category')
@ApiTags('News-Category')
export class NewsCategoryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queriesBus: QueryBus
  ) {
  }

  @Get()
  @ApiOkResponse({type: [GetAllNewsCategoryResponse]})
  async getAllNewsCategory(@Query() filters: GetAllNewsCategoryFilters) {
    return await this.queriesBus.execute(new GetAllNewsCategoryQuery(filters))
  }

  @Get(':id')
  @ApiOkResponse({type: [GetOneNewsCategoryResponse]})
  async getOneNewsCategory(@Param('id', ParseIntPipe) id: number) {
    const cmd = new GetOneNewsCategoryQuery()
    cmd.id = id
    return await this.queriesBus.execute(cmd)
  }

  @Post()
  @ApiCreatedResponse({type: CreateNewsCategoryResponse})
  async createNewsCategory(@Body() command: CreateNewsCategoryCommands) {
    return await this.commandBus.execute(command)
  }

  @Delete(':id')
  async deleteNewsCategory(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteNewsCategoryCommands()
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

  @Patch(':id')
  @ApiOkResponse({type: UpdateNewsCategoryResponse})
  async updateNewsCategory(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateNewsCategoryCommands) {
    command.id = id
    return await this.commandBus.execute(command)
  }
}