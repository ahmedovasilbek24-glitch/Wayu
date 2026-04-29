import {Body, Controller, Get, Post, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse} from "@nestjs/swagger";
import {CreateNewsResponse} from "@/features/news/news/commonds/create-news.commonds/create-news.response";
import {CreateNewsCategoryCommands} from "@/features/news/news-categories/commonds/create-news-category.commonds/create-news-category.commands";
import {GetAllNewsResponse} from "@/features/news/news/query/get-all-news/get-all-news.response";
import {GetAllNewsFilters} from "@/features/news/news/query/get-all-news/get-all-news.filters";
import {GetAllNewsQuery} from "@/features/news/news/query/get-all-news/get-all-news.query";

@Controller('admin/news')
export class NewsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {
  }

  @Post()
  @ApiCreatedResponse({type: CreateNewsResponse})
  async createNews(@Body() payload: CreateNewsCategoryCommands) {
    return await this.commandBus.execute(payload)
  }

  @Get()
  @ApiOkResponse({type: [GetAllNewsResponse]})
  async getAllNews(@Query() filters: GetAllNewsFilters) {
    return await this.queryBus.execute(new GetAllNewsQuery(filters))
  }
}