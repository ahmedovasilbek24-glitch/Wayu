import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {FaqsEntity} from "@/features/support/faqs/faqs.entity";
import {plainToInstance} from "class-transformer";
import {GetAllFaqsQuery} from "@/features/support/faqs/admin/query/get-all-faqs/get-all-faqs.query";
import {GetAllFaqsResponse} from "@/features/support/faqs/admin/query/get-all-faqs/get-all-faqs.response";

@QueryHandler(GetAllFaqsQuery)
export class GetAllFaqsHandler implements IQueryHandler<GetAllFaqsQuery> {
  async execute(query: GetAllFaqsQuery): Promise<GetAllFaqsResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const faqs = await FaqsEntity.find({skip, take});
    return plainToInstance(GetAllFaqsResponse, faqs, {excludeExtraneousValues: true});
  }
}