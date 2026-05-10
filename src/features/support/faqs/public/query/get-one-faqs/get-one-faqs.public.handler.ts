import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer"
import {GetOneFaqsPublicQuery} from "@/features/support/faqs/public/query/get-one-faqs/get-one-faqs.public.query";
import {GetOneFaqsPublicResponse} from "@/features/support/faqs/public/query/get-one-faqs/get-one-faqs.public.response";
import {FaqsEntity} from "@/features/support/faqs/faqs.entity";

@QueryHandler(GetOneFaqsPublicQuery)
export class GetOneFaqsPublicHandler implements IQueryHandler<GetOneFaqsPublicQuery> {
  async execute(query: GetOneFaqsPublicQuery): Promise<GetOneFaqsPublicResponse> {
    const faq = await FaqsEntity.findOneBy({id: query.id});

    if (!faq)
      throw new NotFoundException("FAQ with given id not found");

    return plainToInstance(GetOneFaqsPublicResponse, faq, {excludeExtraneousValues: true});
  }
}