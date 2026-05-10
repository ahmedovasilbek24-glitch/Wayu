import {Controller, Get, Param, ParseIntPipe, Query} from "@nestjs/common";
import {ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {QueryBus} from "@nestjs/cqrs";
import {GetAllFaqsPublicResponse} from "@/features/support/faqs/public/query/get-all-faqs/get-all-faqs.public.response";
import {GetAllFaqsPublicFilters} from "@/features/support/faqs/public/query/get-all-faqs/get-all-faqs.public.filters";
import {GetAllFaqsPublicQuery} from "@/features/support/faqs/public/query/get-all-faqs/get-all-faqs.public.query";
import {GetOneFaqsPublicResponse} from "@/features/support/faqs/public/query/get-one-faqs/get-one-faqs.public.response";
import {GetOneFaqsPublicQuery} from "@/features/support/faqs/public/query/get-one-faqs/get-one-faqs.public.query";

@Controller('public/faq')
@ApiTags('FAQ-public')
export class FaqsPublicController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  @ApiOkResponse({type: [GetAllFaqsPublicResponse]})
  async getAllFaqs(@Query() filters: GetAllFaqsPublicFilters) {
    return await this.queryBus.execute(new GetAllFaqsPublicQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({type: GetOneFaqsPublicResponse})
  async getOneFaq(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneFaqsPublicQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}