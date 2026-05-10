import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {GetAllFaqsPublicQuery} from "@/features/support/faqs/public/query/get-all-faqs/get-all-faqs.public.query";
import {GetAllFaqsPublicResponse} from "@/features/support/faqs/public/query/get-all-faqs/get-all-faqs.public.response";
import {FaqsEntity} from "@/features/support/faqs/faqs.entity";

@QueryHandler(GetAllFaqsPublicQuery)
export class GetAllFaqPublicHandler implements IQueryHandler<GetAllFaqsPublicQuery> {
  async execute(query: GetAllFaqsPublicQuery): Promise<GetAllFaqsPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const faqs = await FaqsEntity.find({skip, take});
    return plainToInstance(GetAllFaqsPublicResponse, faqs, {excludeExtraneousValues: true});
  }
}