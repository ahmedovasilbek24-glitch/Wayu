import {Controller, Get, Param, ParseIntPipe, Query} from "@nestjs/common";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {GetAllQuestionPublicResponse} from "@/features/support/questions/public/query/get-all-question/get-all-question.public.response";
import {GetAllQuestionPublicFilters} from "@/features/support/questions/public/query/get-all-question/get-all-question.public.filters";
import {GetAllQuestionPublicQuery} from "@/features/support/questions/public/query/get-all-question/get-all-question.public.query";
import {GetOneQuestionPublicResponse} from "@/features/support/questions/public/query/get-one-question/get-one-question.public.response";
import {GetOneQuestionPublicQuery} from "@/features/support/questions/public/query/get-one-question/get-one-question.public.query";

@Controller('public/question')
@ApiTags('Question-public')
export class QuestionPublicController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({type: [GetAllQuestionPublicResponse]})
  async getAllQuestions(@Query() filters: GetAllQuestionPublicFilters) {
    return await this.queryBus.execute(new GetAllQuestionPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({type: GetOneQuestionPublicResponse})
  async getOneQuestion(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneQuestionPublicQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}