import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {GetAllEventCategoryQuery} from "@/features/events/events-category/query/get-all-event-category/get-all-event-category.query";
import {GetAllEventCategoryResponse} from "@/features/events/events-category/query/get-all-event-category/get-all-event-category.response";
import {EventCategoriesEntity} from "@/features/events/events-category/eventCategories.entity";

@QueryHandler(GetAllEventCategoryQuery)
export class GetAllEventCategoryHandler implements IQueryHandler<GetAllEventCategoryQuery> {
  async execute(query: GetAllEventCategoryQuery): Promise<GetAllEventCategoryResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const categories = await EventCategoriesEntity.find({skip, take});
    return plainToInstance(GetAllEventCategoryResponse, categories, {excludeExtraneousValues: true});
  }
}