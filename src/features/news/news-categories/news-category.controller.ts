import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import {CreateNewsCategoryCommands} from "@/features/news/news-categories/commonds/create-news-category.commonds/create-news-category.commands";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateNewsCategoryResponse} from "@/features/news/news-categories/commonds/create-news-category.commonds/create-news-category.response";
import {GetAllNewsCategoryResponse} from "@/features/news/news-categories/query/get-all-news-category/get-all-news-catefory.response";
import {GetAllNewsCategoryFilters} from "@/features/news/news-categories/query/get-all-news-category/get-all-news-category-filters";
import {GetAllNewsCategoryQuery} from "@/features/news/news-categories/query/get-all-news-category/get-all-news-category.query";

@Controller('admin/news-category')
export class NewsCategoryController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {
  }

  @Post()
  @ApiCreatedResponse({type: CreateNewsCategoryResponse})
  async createNewsCategory(@Body() payload: CreateNewsCategoryCommands) {
    return await this.commandBus.execute(payload);
  }

  @Get()
  @ApiOkResponse({type: [GetAllNewsCategoryResponse]})
  async getAllNewsCategory(@Query() filters: GetAllNewsCategoryFilters) {
    return await this.queryBus.execute(new GetAllNewsCategoryQuery(filters))
  }
}
