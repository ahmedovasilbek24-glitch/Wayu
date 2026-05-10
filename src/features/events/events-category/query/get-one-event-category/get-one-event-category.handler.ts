import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {GetOneEventCategoryQuery} from "@/features/events/events-category/query/get-one-event-category/get-one-event-category.request";
import {GetOneEventCategoryResponse} from "@/features/events/events-category/query/get-one-event-category/get-one-event-category.response";
import {EventCategoriesEntity} from "@/features/events/events-category/eventCategories.entity";

@QueryHandler(GetOneEventCategoryQuery)
export class GetOneEventCategoryHandler implements IQueryHandler<GetOneEventCategoryQuery> {
  async execute(query: GetOneEventCategoryQuery): Promise<GetOneEventCategoryResponse> {
    const category = await EventCategoriesEntity.findOneBy({id: query.id});

    if (!category)
      throw new NotFoundException("Event category with given id not found");

    return plainToInstance(GetOneEventCategoryResponse, category, {excludeExtraneousValues: true});
  }
}