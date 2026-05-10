import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {FaqsEntity} from "@/features/support/faqs/faqs.entity";
import {GetOneFaqsQuery} from "@/features/support/faqs/admin/query/get-one-faqs/get-one-faqs.query";
import {GetOneFaqsResponse} from "@/features/support/faqs/admin/query/get-one-faqs/get-one-faqs.response";

@QueryHandler(GetOneFaqsQuery)
export class GetOneFaqsHandler implements IQueryHandler<GetOneFaqsQuery> {
  async execute(query: GetOneFaqsQuery): Promise<GetOneFaqsResponse> {
    const faq = await FaqsEntity.findOneBy({id: query.id});

    if (!faq)
      throw new NotFoundException("FAQ with given id not found");

    return plainToInstance(GetOneFaqsResponse, faq, {excludeExtraneousValues: true});
  }
}