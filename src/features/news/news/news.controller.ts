import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query} from "@nestjs/common";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {CreateNewsResponse} from "@/features/news/news/commonds/create-news.commonds/create-news.response";
import {CreateNewsCategoryCommands} from "@/features/news/news-categories/commonds/create-news-category.commonds/create-news-category.commands";
import {GetAllNewsResponse} from "@/features/news/news/query/get-all-news/get-all-news.response";
import {GetAllNewsFilters} from "@/features/news/news/query/get-all-news/get-all-news.filters";
import {GetAllNewsQuery} from "@/features/news/news/query/get-all-news/get-all-news.query";
import {GetOneNewsResponse} from "@/features/news/news/query/get-one-news/get-one-news.response";
import {GetOneNewsQuery} from "@/features/news/news/query/get-one-news/get-one-news.query";
import {DeleteNewsCommand} from "@/features/news/news/commonds/delete-news/delete-news.command";
import {UpdateNewsResponse} from "@/features/news/news/commonds/update-news/update-news.response";
import {UpdateNewsCommands} from "@/features/news/news/commonds/update-news/update-news.commands";

@Controller('admin/news')
@ApiTags('News')
export class NewsController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {
  }

  @Get()
  @ApiOkResponse({type: [GetAllNewsResponse]})
  async getAllNews(@Query() filters: GetAllNewsFilters) {
    return await this.queryBus.execute(new GetAllNewsQuery(filters))
  }

  @Get(':id')
  @ApiOkResponse({type: [GetOneNewsResponse]})
  async getOneNews(@Param('id', ParseIntPipe) id: number) {
    const cmd = new GetOneNewsQuery()
    cmd.id = id
    return await this.queryBus.execute(cmd)
  }

  @Post()
  @ApiCreatedResponse({type: CreateNewsResponse})
  async createNews(@Body() payload: CreateNewsCategoryCommands) {
    return await this.commandBus.execute(payload)
  }

  @Delete(':id')
  async deleteNews(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteNewsCommand()
    cmd.id = id;
    return await this.commandBus.execute(cmd)
  }

  @Patch(':id')
  @ApiOkResponse({type: UpdateNewsResponse})
  async updateNews(@Param('id', ParseIntPipe) id: number, @Body() command: UpdateNewsCommands) {
    command.id = id
    return await this.commandBus.execute(command)
  }
}